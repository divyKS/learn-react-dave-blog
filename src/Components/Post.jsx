import { Link } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <article>
        <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
        </Link>
        <p>{post.datetime}</p>
        <p>
            {post.body.length < 200 ? (
                post.body
            ):(
                `${post.body.slice(0, 180)}...`
            )}
        </p>
    </article>
  )
}

export default Post