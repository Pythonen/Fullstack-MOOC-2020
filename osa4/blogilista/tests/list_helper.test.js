const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
    const blogs = helper.blogs

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('when list has multiple blogs', () => {
        expect(listHelper.totalLikes(helper.blogs)).toBe(36)
    })
} )

describe('most liked blog', () => {
    test('most liked blog with title, author and likes', () => {
        expect(listHelper.favouriteBlog(helper.blogs)).toEqual(helper.blogs[2])
    })
})

describe('most written blogs', () => {
    test('most written blogs by author and number of blogs', () => {
        expect(listHelper.mostBlogs(helper.blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
    })
})

describe('most liked blogs', () => {
    test('most liked blogs by by one author', () => {
        expect(listHelper.mostLikes(helper.blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    })
})

