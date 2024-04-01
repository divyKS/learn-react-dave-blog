import "./App.css";

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import Home from "./Components/Home";
import NewPost from "./Components/NewPost";
import About from "./Components/About";
import PostPage from "./Components/PostPage";
import Missing from "./Components/Missing";
import UpdatePost from "./Components/UpdatePost";


import HomeLayout from "./Layouts/HomeLayout";


const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={< HomeLayout/>}>
      <Route index element={<Home />} />
      <Route path="post" element={<NewPost />} />
      <Route path="post/:id" element={<PostPage />} />
      <Route path="about" element={<About />} />
      <Route path="update/:id" element={<UpdatePost />} />
      <Route path="*" element={<Missing />} />
    </Route>
  )
)


function App() {

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
