import Feed from './Feed'
import { useContext } from 'react'
import DataContext from '../context/DataContext'

const Home = () => {
  const{searchResults: posts, isLoading, fetchError} = useContext(DataContext);
    return (
      <main>
        {isLoading && <p style={{color: "blue"}}>Your blogs are being fetched...</p>}
        
        {!isLoading && fetchError && <p style={{color: "red"}}>{fetchError}</p>}
        
        {!isLoading && !fetchError && ( 
          posts.length ? (
            <Feed posts={posts}/>
          ) : (
            <p>You do not have any posts right now.</p>
          ))
        }
      </main>
    )
  }
  
  export default Home