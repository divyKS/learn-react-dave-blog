import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from '../api/posts'

import useAxiosFetch from '../hooks/useAxiosFetch';

// createContext provides Provider & useContext
const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const navigate = useNavigate();

	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateBody, setUpdateBody] = useState("");


	const { data: dataFromCH, isLoading, fetchError } = useAxiosFetch("http://localhost:3500/posts");

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
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, setSearchResults, 
            posts, setPosts,
            postTitle, setPostTitle,
            postBody, setPostBody,
            updateTitle, setUpdateTitle,
            updateBody, setUpdateBody,
            handleUpdate

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;