export function storeData (data) {
  return {
    type: 'STORE_DATA',
    data: data
  }
}

export function login (id) {
  return {
    type: 'LOGIN',
    id: id
  }
}
