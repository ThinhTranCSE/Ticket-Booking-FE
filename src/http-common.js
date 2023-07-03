import axios from 'axios';
import store from './store';

const storedJson = JSON.parse(localStorage.getItem('VUEX-PERSISTEDSTATE'));
const token = storedJson ?  storedJson.value.setToken : null;
export default axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        Authorization: 'Bearer ' + token
    }
})