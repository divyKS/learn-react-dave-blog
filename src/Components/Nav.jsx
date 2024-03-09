import { Link } from "react-router-dom"
const Nav = ({ search, setSearch }) => {
    return (
        <nav>
            <form className="searchPostForm" onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor="searchPostInput">Search Posts</label>
                <input
                    id="searchPostInput"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
  }
  
  export default Nav