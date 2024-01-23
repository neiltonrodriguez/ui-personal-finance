import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const user = ref(JSON.parse(localStorage.getItem('user')));

    function setToken(tokenValue) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue
    }

    function setUser(userValue) {
        localStorage.setItem('user', JSON.stringify(userValue));
        user.value = userValue
    }

    function clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        token.value = '';
        user.value = '';
    }

    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value
            const { data } = await http.post('check', {
                headers: {
                    Authorization: tokenAuth
                }
            });
            if (data.check) {
                return true
            }
            return false
        } catch (error) {
            console.log(error)
        }
    }


    return {
        token,
        checkToken,
        setToken,
        user,
        clear,
        setUser,
    }
})