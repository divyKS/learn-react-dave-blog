import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";

const Nav = () => {
  const [search, setSearch] = useState("");
  const { posts, setSearchResults } = useContext(DataContext);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchResults(filteredPosts);
    // the posts, so that when new post is added it is shown too without reload
  }, [posts, search]);

  return (
    <nav>
      <form className="searchPostForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="searchPostInput">Search Posts</label>
        <input
          id="searchPostInput"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
