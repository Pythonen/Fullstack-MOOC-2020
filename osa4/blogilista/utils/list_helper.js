
const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const reducer = (acc, blog) => {
    if (acc.likes < blog.likes){
        acc = blog
    }
    return acc
}

const favouriteBlog = blogs => {
    return blogs.reduce(reducer)
}

const mostBlogs = blogs => {
    let counts = {}
    let compare = 0
    let mostBlgs
    const authors = blogs.map(blog => blog.author)
    for(let i = 0; i < authors.length; i++){
        let author = authors[i]
        counts[author] === undefined ? counts[author] = 1 : counts[author] = counts[author] + 1
        if(counts[author] > compare){
            compare = counts[author]
            mostBlgs = authors[i]
        }
    }
    return({
        author: mostBlgs,
        blogs: compare })
}

const mostLikes = blogs => {
    let likes = 0
    const mostPopular = blogs.reduce((a, b) => a.likes > b.likes ? a : b
    )
    blogs.forEach(blog => blog.author === mostPopular.author
        ? likes += blog.likes
        : 0
    )
    return {
        author: mostPopular.author,
        likes: likes
    }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }


/* const mostLikes = blogs.reduce((acc, blog) => {
    if (acc < blog.likes){
        acc = blog.likes
    } }
) */