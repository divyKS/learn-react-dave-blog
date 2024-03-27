import Feed from './Feed'

import { useContext } from 'react'
import DataContext from '../Context/DataContext'


const Home = () => {
  
  console.log("Home before context");
  const { posts, searchResults, isLoading, fetchError } = useContext(DataContext);
  console.log("Home after context");

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