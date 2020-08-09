import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(url)
  }

const create = Person => {
    const request = axios.post(url, Person)
    return request.then(response => response.data)
  }

const deleteNum = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
    }
const update = (id, person) => {
    const request = axios.put(`${url}/${id}`, person)
    return (request.then(res => res.data))
}

export default {create, getAll, deleteNum, update}