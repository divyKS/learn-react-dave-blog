import { useContext } from "react";
import { Link, useParams } from "react-router-dom"
import DataContext from "../Context/DataContext";
import api from '../api/posts'
import { useNavigate } from "react-router-dom";


const PostPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // this is a string
    const { posts, setPosts } = useContext(DataContext)
    const post = posts.find((post) => post.id.toString() === id)
    
    const handleDelete = async (id) => {
		try {
			const response = await api.delete(`/posts/${id}`);
			const updatedPostsList = posts.filter((post)=>post.id.toString() !== id);
			setPosts(updatedPostsList);
			navigate("/");        
		} catch (e){
			console.log(e.message)
		}
    };

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