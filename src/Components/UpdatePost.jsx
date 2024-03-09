import { useEffect } from "react";
import { useParams, Link } from "react-router-dom"
const UpdatePost = ({ posts, handleUpdate, updateTitle, updateBody, setUpdateTitle, setUpdateBody }) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);
    
    useEffect(()=>{
        // don't do this outside useEffect
        if(post){
            setUpdateBody(post.body);
            setUpdateTitle(post.title);
        }
    }, [post]);

    return (
        <main>
            {updateTitle && 
                <>
                    <h2>Update your post!</h2>            
                    <form className="updatePostForm" onSubmit={(e) => {e.preventDefault();handleUpdate(new Date(), id)}}>
                        <label htmlFor="titleInput">Post Title</label>
                        <input
                            id="titleInput"
                            type="text"
                            placeholder="Enter post title here"
                            required
                            value={updateTitle}
                            onChange={(e)=>setUpdateTitle(e.target.value)}
                        />
                        <label htmlFor="bodyInput">Post Body</label>
                        <textarea
                            id="bodyInput"
                            placeholder="Enter post content here"
                            required
                            value={updateBody}
                            onChange={(e)=>setUpdateBody(e.target.value)}
                        />
                        <button
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </>
            }
            {!updateTitle && 
                <>
                    <p>This page does not exist.</p>
                    <Link to="/">
                        <p>Go to home page.</p>
                    </Link>
                </>
            }
		</main>
    )
}

export default UpdatePost