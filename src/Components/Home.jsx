import Feed from './Feed'

const Home = ({ posts }) => {
    return (
      <main>
        {
          posts.length ? (
            <Feed posts={posts}/>
          ) : (
            <p>You do not have any posts right now.</p>
          )
        }
      </main>
    )
  }
  
  export default Home