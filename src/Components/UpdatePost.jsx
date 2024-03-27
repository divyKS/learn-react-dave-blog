import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "../Context/DataContext";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { posts, setPosts } = useContext(DataContext);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");

  const post = posts.find((post) => post.id.toString() === id);

  const handleUpdate = async (dateObj, id) => {
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

    const newPutObj = {
      id: id,
      title: updateTitle,
      datetime: datetimeInfo,
      body: updateBody,
    };

    try {
      const response = await api.put(`/posts/${id}`, newPutObj);
      const postListAfterUpdatingAPost = [
        ...posts.filter((post) => post.id.toString() !== id),
        response.data,
      ];
      setPosts(postListAfterUpdatingAPost);
      setUpdateBody("");
      setUpdateTitle("");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // don't do this outside useEffect
    if (post) {
      setUpdateBody(post.body);
      setUpdateTitle(post.title);
    }
  }, [post]);

  return (
    <main>
      {id && (
        <>
          <h2>Update your post!</h2>
          <form
            className="updatePostForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(new Date(), id);
            }}
          >
            <label htmlFor="titleInput">Post Title</label>
            <input
              id="titleInput"
              type="text"
              placeholder="Enter post title here"
              required
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <label htmlFor="bodyInput">Post Body</label>
            <textarea
              id="bodyInput"
              placeholder="Enter post content here"
              required
              value={updateBody}
              onChange={(e) => setUpdateBody(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {!id && (
        <>
          <p>This page does not exist.</p>
          <Link to="/">
            <p>Go to home page.</p>
          </Link>
        </>
      )}
    </main>
  );
};

export default UpdatePost;
