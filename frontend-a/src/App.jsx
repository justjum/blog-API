import { useState } from "react";
import Login from "../components/login";
import BlogPosts from "../components/blog-posts";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return <>{localStorage.accessToken ? <BlogPosts /> : <Login />}</>;
}

export default App;
