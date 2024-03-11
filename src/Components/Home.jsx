import Feed from './Feed'

import { useContext, useEffect } from 'react'
import DataContext from '../Context/DataContext'

import useAxiosFetch from '../hooks/useAxiosFetch';

const Home = () => {
	
  const { data, isLoading, fetchError } = useAxiosFetch("http://localhost:3500/posts");
  const { posts, setPosts, searchResults } = useContext(DataContext);

  useEffect(()=>{  
		setPosts(data);
	}, [data])

    return (
      <main>
        {isLoading && <p style={{color: "blue"}}>Your blogs are being fetched...</p>}
        
        {!isLoading && fetchError && <p style={{color: "red"}}>{fetchError}</p>}
        
        {!isLoading && !fetchError && ( 
          posts.length ? (
            <Feed posts={searchResults}/>
          ) : (
            <p>You do not have any posts right now.</p>
          ))
        }
      </main>
    )
  }
  
  export default Home