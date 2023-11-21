const storage = localStorage

// export function setStorageItem(key, value) {
//   if (typeof value === "object") {
//     return storage.setItem(key, value)
//   } else{
//     return storage.setItem(key, JSON.stringify(value))
//   }
// }

export function setStorageItem(key, value) {
  return storage.setItem(key, JSON.stringify(value))
}

export function loadStorageItem(key) {
  return JSON.parse(storage.getItem(key) )
}

export function remoiveStorageItem(key) {
  return storage.removeItem(key)
}