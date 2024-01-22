import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const user = ref(JSON.parse(localStorage.getItem('user')));
    const modulos = ref(JSON.parse(localStorage.getItem('modulos')));

    function setToken(tokenValue) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue
    }

    function setUser(userValue) {
        localStorage.setItem('user', JSON.stringify(userValue));
        user.value = userValue
    }

    function setModulos(p) {
        localStorage.setItem('modulos', JSON.stringify(p.modulos[0]));
        modulos.value = p.modulos[0]
    }

    function clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('modulos');
        token.value = '';
        user.value = '';
        modulos.value = '';
    }

    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value
            const { data } = await http.get('me', {
                headers: {
                    Authorization: tokenAuth
                }
            });
            if (data.code === "token_valid") {
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
        setModulos,
        modulos,
    }
})