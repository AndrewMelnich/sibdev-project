import { defineStore } from 'pinia';

function setInLocalStorage(name, obj){
  const newItem = obj;
  localStorage.setItem(name, JSON.stringify(newItem));
}

export const useFavoriteStore = defineStore({
  id: 'favorite',
  state: () => ({
    favoriteList: []
  }),
  actions: {
    addFavoriteItem(elem){
      this.favoriteList.push(elem)
      setInLocalStorage('favorite-list', this.favoriteList)
    },

    changeFavoriteList(newFavoriteList){
      setInLocalStorage('favorite-list', newFavoriteList)
    }
  },
});