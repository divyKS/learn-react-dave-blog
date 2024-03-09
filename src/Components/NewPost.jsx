const NewPost = ({ handleSubmit, postTitle, postBody, setPostTitle, setPostBody }) => {
	return (
		<main>
            <h2>Create a new post!</h2>
			<form className="newPostForm" onSubmit={(e) => {e.preventDefault();handleSubmit(new Date())}}>
                <label htmlFor="titleInput">Post Title</label>
                <input
                    id="titleInput"
                    type="text"
                    placeholder="Enter post title here"
                    required
                    value={postTitle}
                    onChange={(e)=>setPostTitle(e.target.value)}
                />
                <label htmlFor="bodyInput">Post Body</label>
                <textarea
                    id="bodyInput"
                    placeholder="Enter post content here"
                    required
                    value={postBody}
                    onChange={(e)=>setPostBody(e.target.value)}
                />
                <button
                    type="submit"
                >
                    Submit
                </button>
            </form>
		</main>
	);
};

export default NewPost;
