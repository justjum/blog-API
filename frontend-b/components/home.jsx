import BlogPosts from "./blog-posts";

function Home({handleLogin, isLoggedIn, setAlertMessage}) {
    return <>
        <section className="content">
            <h2>Blog Posts</h2>
            <BlogPosts isLoggedIn={isLoggedIn} setAlertMessage={setAlertMessage}/>
        </section>
    </>
}

export default Home;