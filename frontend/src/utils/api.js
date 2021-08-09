class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers}

  _header(customHeaders) {

    if (customHeaders) {
      return customHeaders} else {
        return this._headers}
  }

  _apiRequest(urlEnd, method, body, customHeaders) {
    if (method === 'GET') {
      return fetch(`${this._baseUrl}${urlEnd}`, {
        method: method,
        headers: this._header(customHeaders),
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    } else {
      return fetch(`${this._baseUrl}${urlEnd}`, {
        method: method,
        headers: this._header(customHeaders),
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
    }
  }

  signUp(data) {
    return this._apiRequest('/signup', 'POST', {
      password: data.password,
      email: data.email
    })
  }

  signIn(data) {
    return this._apiRequest('/signin', 'POST', {
      password: data.password,
      email: data.email
    })
  }

  checkToken() {
    return this._apiRequest('/users/me', 'GET', null, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  getUserInfo() {
    return this._apiRequest('/users/me', 'GET', null, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  updateUserInfo(userInfo) {
    return this._apiRequest('/users/me', 'PATCH', {
      name: userInfo.name,
      about: userInfo.about,
    }, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  setNewAvatar(avatarUrl) {
    return this._apiRequest('/users/me/avatar', 'PATCH', {
      avatar: avatarUrl,
    }, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  getInitialCards() {
    return this._apiRequest('/cards', 'GET', null,{
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  addNewCard(card) {
    return this._apiRequest('/cards', 'POST', {
      name: card.name,
      link: card.link
    }, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  addCardLike(id) {
    return this._apiRequest(`/cards/likes/${id}`, 'PUT', {}, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  removeCardLike(id) {
    return this._apiRequest(`/cards/likes/${id}`, 'DELETE', {}, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }

  removeCard(id) {
    return this._apiRequest(`/cards/${id}`, 'DELETE',{}, {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    })
  }
}

// export const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
//   headers: {
//     authorization: 'b51eb88c-1f29-40be-ab99-c44982cb41ab',
//     'Content-Type': 'application/json',
//   },
// })

// export const authApi = new Api({
//   baseUrl: 'https://auth.nomoreparties.co',
//   headers: {
//     'Content-Type': 'application/json'
//   },
// })

// export const api = new Api({
//   baseUrl: 'http://localhost:3005',
//   // headers: {
//   //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTBjMjNkOTA4MDljZmExZDJiYzQxYzgiLCJpYXQiOjE2MjgxODU1ODMsImV4cCI6MTYyODc5MDM4M30.t5daluogxaOh95Q9uuvHazccID9OTv6y__T849HEZIY',
//   //   'Content-Type': 'application/json',
//   // },
// })

// export const authApi = new Api({
//     baseUrl: 'http://localhost:3005',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   })

export const api = new Api({
  baseUrl: 'https://sam-mesto-api.nomoredomains.club',
})

export const authApi = new Api({
    baseUrl: 'https://sam-mesto-api.nomoredomains.club',
    headers: {
      'Content-Type': 'application/json'
    },
  })