import axios from 'axios'
export function getNews () {
  return axios.get('api/news/latest').then(res => {
    return Promise.resolve(res)
  })
}
export function getNewsBefore (date) {
  return axios.get('api/news/before/' + date).then(res => {
    return Promise.resolve(res)
  })
}
