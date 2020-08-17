import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(baseUrl, newBlog, config)
    return res.data
}

const update = async (id, newBlog) => {
    const request = axios.put(`${baseUrl}/${id}`, newBlog)
    return request.then(response => response.data)
}

const remove = (id,token) => {
    return axios.delete(`${baseUrl}/${id}`,{
        headers: {
            Authorization: `bearer ${token}`
        }
    })
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll, create, setToken, update, remove }