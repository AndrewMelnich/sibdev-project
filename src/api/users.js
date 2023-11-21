import { loadStorageItem, setStorageItem } from "@/servises/localStorage";

export function fetchUsers() {
  return new Promise((resolve) => {
    const users = loadStorageItem("users");
    resolve(users) 
  })
 
}

export function getCurrentUser() {
  return new Promise((resolve) => {
    const  currentUser = loadStorageItem("currentUser");

    return resolve(currentUser)
  })
}

export function updateUsers(id, newFavouriteList) {
  return new Promise((resolve) => {
    const users = loadStorageItem("users");

    const newUsers = users.map((user) => {
      if (user.id === id) {

        return {
          ...user,
          favouriteList: newFavouriteList,
        };
      }
      return user;
    });
  
    setStorageItem("users", newUsers);
    return resolve(users) 
  })
}

export function createFavouiteQuery(newFavouiteRequest) {
  return new Promise((resolve) => {
    const currentUser = loadStorageItem("currentUser");

    const favourite = {
      id: Math.random() * 1000,
      ...newFavouiteRequest,
    };
  
    const newCurrentUser = {
      ...currentUser,
      favouriteList: [...currentUser.favouriteList, favourite]
    }
  
    setStorageItem("currentUser", newCurrentUser);
  
    updateUsers(currentUser.id, newCurrentUser.favouriteList)

    return resolve(newCurrentUser)
  })
}

export function updateFavouiteQuery(newFavouiteRequest) {
  return new Promise((resolve) => {
    const currentUser = loadStorageItem("currentUser");

    const newCurrentUser = {
      ...currentUser,
      favouriteList: currentUser.favouriteList.map((favouriteItem) => {
        if (favouriteItem.id === newFavouiteRequest.id) {
          return {
            ...favouriteItem,
            ...newFavouiteRequest
          }
        } 
        return favouriteItem
      })
    }
  
    setStorageItem("currentUser", newCurrentUser);
  
    updateUsers(currentUser.id, newCurrentUser.favouriteList)

    return resolve(newCurrentUser)
  })
}

export function deleteFavouiteQuery(id) {
  return new Promise((resolve) => {
    const currentUser = loadStorageItem("currentUser");

    const newFavouriteList = currentUser.favouriteList.filter(
      (favourite) => favourite.id !== id
    );

    const newCurrentUser = {
      ...currentUser,
      favouriteList: newFavouriteList
    }
  
    setStorageItem("currentUser", newCurrentUser);
  
    updateUsers(currentUser.id, newFavouriteList)

    return resolve(newCurrentUser)
  })
}