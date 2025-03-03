require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const app = express();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const Composition = require("./models/composition");
const Post = require("./models/post");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error("Error:", error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MulterError") {
    return response.status(400).json({ error: "File upload error" });
  }

  response.status(500).json({ error: "Internal server error" });
};

app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("Params: ", request.params);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.static("dist"));

app.use(express.json()); //used to parse recieved JSON

app.use(requestLogger);
app.use(morgan("tiny"));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/wav") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

app.use("/uploads", express.static("uploads"));

let compositions = [];

app.get("/api/compositions", (request, response) => {
  Composition.find({})
    .then((compositions) => {
      response.json(compositions);
    })
    .catch((error) => next(error));
});

app.get("/api/compositions/random", (request, response, next) => {
  const language = request.query.language;

  const query = language ? { language: language } : {};

  Composition.countDocuments(query)
    .then((count) => {
      if (count === 0) {
        return response
          .status(404)
          .json({ error: "No compositions found for this language" });
      }
      const random = Math.floor(Math.random() * count);
      return Composition.findOne(query).skip(random);
    })
    .then((composition) => {
      if (composition) {
        response.json(composition);
      } else {
        response.status(404).json({ error: "No compositions found" });
      }
    })
    .catch((error) => next(error));
});

app.get("/api/compositions/:id", (request, response, next) => {
  Composition.findById(request.params.id)
    .then((composition) => {
      if (composition) response.json(composition);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/compositions/:id", (request, response) => {
  Composition.findByIdAndDelete(request.params.id)
    .then((composition) => {
      console.log(composition, request.params.id);
      response.json(composition);

      compositions = compositions.filter(
        (composition) => composition.id !== request.params.id
      );

      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/compositions", (request, response) => {
  const body = request.body;
  console.log(body.name, typeof body.name);

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }

  const composition = new Composition({
    name: body.name,
    content: body.content,
    language: body.language,
  });

  composition
    .save()
    .then((savedComposition) => {
      response.json(savedComposition);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/compositions/:id", (request, response) => {
  const composition = request.body;
  composition
    .findByIdAndUpdate(
      request.params.id,
      {
        name: composition.name,
        content: composition.content,
      },
      { new: true }
    )
    .then((composition) => {
      if (composition) return response.json(composition);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

//user posts
// GET all posts
app.get("/api/posts", (request, response, next) => {
  Post.find({})
    .then((posts) => {
      response.json(posts);
    })
    .catch((error) => next(error));
});

// GET single post
app.get("/api/posts/:id", (request, response, next) => {
  Post.findById(request.params.id)
    .then((post) => {
      if (post) {
        response.json(post);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST new post
app.post("/api/posts", upload.single("audio"), (request, response, next) => {
  try {
    const body = request.body;
    const file = request.file;

    if (!file || !body.language) {
      return response.status(400).json({
        error: "Missing file or language",
      });
    }

    const post = new Post({
      fileName: file.originalname,
      audioURL: `/uploads/${file.filename}`,
      text: body.text || "",
      language: body.language,
      comments: [],
      createdAt: new Date(),
    });

    post
      .save()
      .then((savedPost) => {
        response.status(201).json(savedPost);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

// GET single post
app.get("/api/posts/:id", (request, response, next) => {
  Post.findById(request.params.id)
    .then((post) => {
      if (post) {
        response.json({
          ...post.toJSON(),
          comments: post.comments || [], // Ensure comments are included
        });
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST comment to a post
app.post("/api/posts/:id/comments", (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "comment content missing",
    });
  }

  const comment = {
    content: body.content,
    createdAt: new Date(),
  };

  Post.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: comment } },
    { new: true }
  )
    .then((updatedPost) => {
      if (updatedPost) {
        response.status(201).json(updatedPost);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

app.use(unknownEndpoint);

app.use(errorHandler);
