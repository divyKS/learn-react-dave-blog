import { createContext, useState } from "react";

// createContext provides Provider & useContext
const DataContext = createContext({});

export const DataProvider = ({ children }) => {

	const [posts, setPosts] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

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

	return (
        <DataContext.Provider value={{
            posts, setPosts,
            searchResults, setSearchResults, 
            postTitle, setPostTitle,
            postBody, setPostBody
		}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;