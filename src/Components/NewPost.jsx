import api from "../api/posts";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import DataContext from "../Context/DataContext";

const NewPost = () => {
  const navigate = useNavigate();

  const { posts, setPosts, postTitle, setPostTitle, postBody, setPostBody } =
    useContext(DataContext);

  const handleSubmit = async (dateObj) => {
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const date = dateObj.getDate();
    let hour = dateObj.getHours();
    let ampm = "AM";
    if (hour > 12) {
      ampm = "PM";
      hour -= 12;
    }
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const datetimeInfo = `${month} ${date}, ${year} ${hour}:${minutes}:${seconds} ${ampm}`;

    const newPostObj = {
      id: newId,
      title: postTitle,
      datetime: datetimeInfo,
      body: postBody,
    };

    try {
      const response = await api.post("/posts", newPostObj);
      // response.data would be same as newPostObj, we get it from axios as response, so we are just using that
      const updatedPostsAfterAdding = [...posts, response.data];
      setPosts(updatedPostsAfterAdding);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <main>
      <h2>Create a new post!</h2>
      <form
        className="newPostForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new Date());
        }}
      >
        <label htmlFor="titleInput">Post Title</label>
        <input
          id="titleInput"
          type="text"
          placeholder="Enter post title here"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="bodyInput">Post Body</label>
        <textarea
          id="bodyInput"
          placeholder="Enter post content here"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
