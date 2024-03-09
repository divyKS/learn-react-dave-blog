import { Link, useParams } from "react-router-dom"
const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams(); // this is a string
    const post = posts.find((post) => post.id.toString() === id)
    return (
        <main>
            <article>
                {!post && 
                    <>
                        <p>This page does not exist.</p>
                        <Link to="/">
                            <p>Go to home page.</p>
                        </Link>
                    </>
                }
                {post && 
                    <>
                        <h2>{post.title}</h2>
                        <p>{post.datetime}</p>
                        <p>{post.body}</p>
                        <button onClick={() => handleDelete(id)}>Delete</button>
                        <button><Link to={`/update/${post.id}`}>Update</Link></button>
                    </>
                }

            </article>
        </main>        
    )
}
  
export default PostPage