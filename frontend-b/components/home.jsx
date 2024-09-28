import BlogPosts from "./blog-posts";

function Home({handleLogin, isLoggedIn}) {
    return <>
        <section className="content">
            <h2>Blog Posts</h2>
            <BlogPosts isLoggedIn={isLoggedIn}/>
        </section>
    </>
}

export default Home;