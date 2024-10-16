import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import BlogPosts from "../components/blog-posts";

function Home({ handleLogin, isLoggedIn, setAlertMessage, setIsLoading }) {
  // Check Authentication
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (isExpired(token)) {
      localStorage.removeItem("accessToken");
      handleLogin(false);
    } else {
      handleLogin(true);
    }
  }, []);

  return (
    <>
      <BlogPosts
        setAlertMessage={setAlertMessage}
        isLoggedIn={isLoggedIn}
        setIsLoading={setIsLoading}
      />
    </>
  );
}

export default Home;
