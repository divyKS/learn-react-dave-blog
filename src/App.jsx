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
import UpdatePost from './Components/UpdatePost';

import api from './api/posts'

import useWindowWidthCalculator from './hooks/useWindowWidth'
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
    const navigate = useNavigate();

	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateBody, setUpdateBody] = useState("");

	const { width } = useWindowWidthCalculator();

	const { data: dataFromCH, isLoading, fetchError } = useAxiosFetch("http://localhost:3500/posts");

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

    const handleSubmit = async (dateObj) => {
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

		try {
			const response = await api.post("/posts", newPostObj);
			// response.data would be same as newPostObj, we get it from axios as response, so we are just using that
			const updatedPostsAfterAdding = [...posts, response.data];
			setPosts(updatedPostsAfterAdding);
			setPostTitle("");
			setPostBody("");
			navigate("/");
		} catch(e) {
			console.log(e.message)
		}

    };

	const handleUpdate = async (dateObj, id) => {
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

        const newPutObj = {
            "id": id,
            "title": updateTitle,
            "datetime": datetimeInfo,
            "body": updateBody
        }

		try {
			const response = await api.put(`/posts/${id}`, newPutObj);
			const postListAfterUpdatingAPost = [...posts.filter((post)=>(post.id.toString())!==id), response.data]
			setPosts(postListAfterUpdatingAPost);
			setUpdateBody("");
			setUpdateTitle("");
			navigate("/");
			
		} catch(e) {
			console.log(e.message)
		}
	}

	// useEffect(()=>{
	// 	const fetchData = async () => {
	// 		try{
	// 			const response = await api.get('/posts');
	// 			const postsData = response.data;
	// 			setPosts(postsData);
	// 		} catch (e) {
	// 			if(e.response){
	// 				console.log(e.response.data);
	// 				console.log(e.response.status);
	// 				console.log(e.response.headers);
	// 			} else {
	// 				console.log(e.message);
	// 			}
	// 		}

	// 	}
	// 	fetchData();
	// }, []);

	useEffect(()=>{
		setPosts(dataFromCH);
	}, [dataFromCH])

    useEffect(()=>{
        const filteredPosts = posts.filter((post)=> (
            post.body.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase())
        ))
        setSearchResults(filteredPosts);
		// the posts, so that when new post is added it is shown too without reload
    }, [posts, search]);

	return (
		<>	
			<div className="container">
				<Header heading="My Blog Site" width={width} />
				<Nav search={search} setSearch={setSearch} />

				<Routes>
					<Route path="/" element={<Home posts={searchResults} isLoading={isLoading} fetchError={fetchError}/>} />
					<Route path="/post" element={<NewPost postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit}/>}/>
					<Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />}/>
					<Route path="/about" element={<About />} />
					<Route path="/update/:id" element={<UpdatePost posts={posts} handleUpdate={handleUpdate} updateBody={updateBody} updateTitle={updateTitle} setUpdateBody={setUpdateBody} setUpdateTitle={setUpdateTitle}/>} />
					<Route path="*" element={<Missing />} />
				</Routes>

				<Footer />
			</div>
		</>
	);
}

export default App;
