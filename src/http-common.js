import axios from 'axios';

const token = JSON.parse(localStorage.getItem('VUEX-PERSISTEDSTATE')).value.setToken;
export default axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        Authorization: 'Bearer ' + token
    }
})