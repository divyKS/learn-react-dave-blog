import './App.css';

import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './Components/Header';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import About from './Components/About';
import PostPage from './Components/PostPage';
import Missing from './Components/Missing';

function App() {
    const navigate = useNavigate();

	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");


	const handleDelete = (id) => {
        const updatedPostsList = posts.filter((post)=>post.id.toString() !== id);
        setPosts(updatedPostsList);
        navigate("/");        
    };

    const handleSubmit = (dateObj) => {
        const newId = posts.length ? posts[posts.length - 1].id + 1: 1; 
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const date = dateObj.getDate();
        let hour = dateObj.getHours();
        let ampm = "AM";
        if(hour > 12){
            ampm = "PM";
            hour-=12;
        }
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();
        const datetimeInfo = `${month} ${date}, ${year} ${hour}:${minutes}:${seconds} ${ampm}`;

        const newPostObj = {
            "id": newId,
            "title": postTitle,
            "datetime": datetimeInfo,
            "body": postBody
        }

        const updatedPostsAfterAdding = [...posts, newPostObj];
        setPosts(updatedPostsAfterAdding);
        setPostTitle("");
        setPostBody("");
        navigate("/");
    };

    useEffect(()=>{
        const filteredPosts = posts.filter((post)=> (
            post.body.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase())
        ))
        setSearchResults(filteredPosts);
    }, [posts, search]);

	return (
		<>	
			<div className="container">
				<Header heading="My Blog Site" />
				<Nav search={search} setSearch={setSearch} />

				<Routes>
					<Route path="/" element={<Home posts={searchResults} />} />
					<Route path="/post" element={<NewPost postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit}/>}/>
					<Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />}/>
					<Route path="/about" element={<About />} />
					<Route path="*" element={<Missing />} />
				</Routes>

				<Footer />
			</div>
		</>
	);
}

export default App;
