import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

// createContext provides Provider & useContext
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  console.log("DataContext before fetch");

  const { data, isLoading, fetchError } = useAxiosFetch(
    "http://localhost:3500/posts",
  );

  console.log("DataContext after fetch");

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

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {}, [postTitle]);

  useEffect(() => {}, [postBody]);

  return (
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        searchResults,
        setSearchResults,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        data,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
