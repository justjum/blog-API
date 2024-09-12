import BlogPosts from "../components/blog-posts";
import Logout from "../components/logout";

function Home({ handleLogin }) {
  return (
    <>
      <Logout handleLogin={handleLogin} />
      <BlogPosts />
    </>
  );
}

export default Home;
