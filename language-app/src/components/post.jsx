import './post.css'



function Post( {content}){
    return (
        <div className='Post'>
             <h2>{content.name}</h2>
             <p>{content.text}</p>
        </div>


    )
}

export default Post;