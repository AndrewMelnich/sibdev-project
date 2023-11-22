const storage = localStorage

export function setStorageItem(key, value) {
  return storage.setItem(key, JSON.stringify(value))
}

export function loadStorageItem(key) {
  return JSON.parse(storage.getItem(key) )
}

export function remoiveStorageItem(key) {
  return storage.removeItem(key)
}