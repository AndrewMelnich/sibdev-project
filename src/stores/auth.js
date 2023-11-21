import { defineStore } from 'pinia';
import { setStorageItem, loadStorageItem } from '@/servises/localStorage'
import {getUsers} from "@/stores/users";

function generateTokens(user){
  return {
    access: `${user.login}#${Math.random()}`,
    refresh: `${user.login}#${Math.random()}refresh`
  }
}

function setDefaultUsers() {
  const users = getUsers()
  // eslint-disable-next-line no-unused-vars
  const localUsers = users.map(({password, ...otherValues}) => {
    return otherValues
  })
  const currentUsers = loadStorageItem('users')

  if (!currentUsers) {
    setStorageItem('users', localUsers)
  }
}

setDefaultUsers()

// function removeInLocalStorage(name){
//   localStorage.removeItem(name);
// }


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // isAuthenticated: false,
    user: { },
    tokens: JSON.parse(localStorage.getItem('currentUser'))?.tokens || {
      access: null,
      refresh: null
    }
  }),

  getters:{
    isAuthenticated(state){
      return Boolean(state.tokens.access);
    }
  },

  actions: {
    login(user) {
      this.user = user
      this.tokens = generateTokens(this.user)

      setStorageItem('currentUser', {
        ...this.user,
        tokens: this.tokens,
      })
    },
    logout() {
      // eslint-disable-next-line no-debugger
      // debugger
      this.tokens = {
        access: null,
        refresh: null
      }
      localStorage.removeItem('currentUser');
    },
  },
});
