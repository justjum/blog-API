import BlogPosts from "./blog-posts";

function Home({handleLogin, isLoggedIn, setAlertMessage, setAlertType, setDeleteConfirm }) {
    return <>
        <section className="content">
            <h2>Blog Posts</h2>
            <BlogPosts isLoggedIn={isLoggedIn} setAlertMessage={setAlertMessage} setAlertType={setAlertType} setDeleteConfirm={setDeleteConfirm}/>
        </section>
    </>
}

export default Home;