require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();

const Composition = require("./models/composition");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
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

let compositions = [];

app.get("/api/compositions", (request, response) => {
  Composition.find({})
    .then((compositions) => {
      response.json(compositions);
    })
    .catch((error) => next(error));
});

app.get("/api/compositions/random", (request, response) => {
  Composition.countDocuments()
    .then((count) => {
      const random = Math.floor(Math.random() * count);
      return Composition.findOne().skip(random);
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

app.use(unknownEndpoint);

app.use(errorHandler);
