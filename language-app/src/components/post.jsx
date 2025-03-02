import './post.css'

function Post({ fileName, audioURL, text }) {
    return (
        <div className="Post">
            <p>{fileName}</p>
            <p>{text}</p>
            <audio controls>
                <source src={audioURL} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default Post;