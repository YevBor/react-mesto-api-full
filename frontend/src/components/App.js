import React from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'

import Login from './Login.js'
import Register from './Register.js'
import Menu from './Menu.js'

import PopupWithTooltip from './popups/PopupWithTooltip'
import ImagePopup from './popups/ImagePopup'
import EditProfilePopup from './popups/EditProfilePopup'
import EditAvatarPopup from './popups/EditAvatarPopup'
import AddPlacePopup from './popups/AddPlacePopup'
import SubmitPopup from './popups/SubmitPopup'

import { api, authApi } from '../utils/api'
import ProtectedRoute from './ProtectedRoute'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {

  const history = useHistory()
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [cards, setCards] = React.useState([])
  const [isMenuOpen, setMenuOpen] = React.useState(false)
  function prepareHamburger() {
    setMenuOpen(!isMenuOpen)
  }
  const [isMobile, setMobile] = React.useState(() => {
    if (window.innerWidth < 620) {
      return true
    } else {
      return false
    }
  })

  const [email, setEmail] = React.useState('');
  const [jwt, setJwt] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({
    avatar:'',
    name: '',
    about: '',
  })

  //состояние попапов
  const [selectedCard, setSelectedCard] = React.useState({})

  const [tooltipPopupState, setTooltipPopupState] = React.useState({
    open: false,
    result: false,
    message: '',
  })
  const [avatarPopupState, setAvatarPopupState] = React.useState({
    open: false,
  })
  const [profilePopupState, setProfilePopupState] = React.useState({
    open: false,
  })
  const [submitPopupState, setSubmitPopupState] = React.useState({
    open: false,
  })
  const [addPlacePopupState, setAddPlacePopupState] = React.useState({
    open: false,
  })

  function closeAllPopups() {
    setAvatarPopupState({
      ...avatarPopupState,
      open: false,
    })
    setProfilePopupState({
      ...profilePopupState,
      open: false,
    })
    setAddPlacePopupState({
      ...addPlacePopupState,
      open: false,
    })
    setTooltipPopupState({
      ...tooltipPopupState,
      open: false,
      result: false,
      message: '',
    })
    setSelectedCard({})
    setSubmitPopupState({
      ...submitPopupState,
      open: false,
    })
  }

  function handleTooltipOpen(result, message) {
    setTooltipPopupState({
      open: true,
      result: result,
      message: message,
    })
  }

  function handleEditAvatarClick() {
    setAvatarPopupState({
      ...avatarPopupState,
      open: true,
    })
  }

  function handleProfileClick() {
    setProfilePopupState({
      ...profilePopupState,
      open: true,
    })
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState({
      ...addPlacePopupState,
      open: true,
    })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function onSubmit(card) {
    setSubmitPopupState({
      ...submitPopupState,
      open: true,
    })
    setDelCard(card)
  }

  React.useEffect(() => {
    const onKeypress = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }

    document.addEventListener('keydown', onKeypress)

    return () => {
      document.removeEventListener('keydown', onKeypress)
    }
  }, [])

  function onSignUp(data) {
    authApi
      .signUp(data)
      .then(() => {
        handleTooltipOpen(true)
      })
      .then(() => {
        setTimeout(() => {
          onSignIn(data)
          closeAllPopups()
        }, 1500)
      })
      .catch((err) => {
        handleTooltipOpen(false, `Не получилось зарегистрироваться: ${err}`)
      })
  }

  function onSignIn(data) {
    authApi
      .signIn(data)
      .then((res) => {
        localStorage.setItem('token', res.jwt)
        setLoggedIn(true)
        setEmail(data.email)
        setJwt(res.jwt);
      })
      .then(() => {
        history.push('/cards')
      })
      .catch((err) => {
        handleTooltipOpen(false, `Не получилось войти: ${err}`)
      })
  }

  function onSignOut() {
    setLoggedIn(false)
    setMenuOpen(false)
    localStorage.removeItem('token')
  }


  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data)
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        closeAllPopups()
        handleTooltipOpen(
          false,
          `Не удалось обновить данные пользователя: ${err}`
        )
      })
  }

  function handleUpdateAvatar(data) {
    api
      .setNewAvatar(data.avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar,
        })
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        closeAllPopups()
        handleTooltipOpen(false, `Не удалось обновить аватар: ${err}`)
      })
  }

  function handleAddPlace(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
      })
      .then(() => {
        closeAllPopups()
      })
      .catch((err) => {
        closeAllPopups()
        handleTooltipOpen(false, `Не удалось добавить карточку: ${err}`)
      })
  }

  const [deletingCard, setDelCard] = React.useState({})

  function handleCardDelete() {
    const isOwn = deletingCard.owner === currentUser._id
    if (isOwn) {
      api
        .removeCard(deletingCard._id)
        .then(() => {
          const newCards = cards.filter((c) => {
            if (c._id === deletingCard._id) {
              return false
            } else {
              return true
            }
          })
          setCards(newCards)
        })
        .catch((err) => {
          handleTooltipOpen(false, `Не удалось удалить карточку: ${err}`)
        })
    } else {
      handleTooltipOpen(
        false,
        `Не удалось удалить карточку`
      )
    }
    setDelCard({})
    closeAllPopups()
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id)

    function updateCards(newCard) {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c))
      setCards(newCards)
    }

    if (isLiked) {
      api
        .removeCardLike(card._id)
        .then((newCard) => {
          updateCards(newCard)
        })
        .catch((err) => {
          handleTooltipOpen(false, `Не удалось поставить лайк: ${err}`)
        })
    } else {
      api
        .addCardLike(card._id)
        .then((newCard) => {
          updateCards(newCard)
        })
        .catch((err) => {
          handleTooltipOpen(false, `Не удалось снять лайк: ${err}`)
        })
    }
  }


  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      authApi
        .checkToken()
        .then((data) => {
          setEmail(data.data.email)
          setLoggedIn(true)
        })
        .then(() => {
          history.push('/cards')
        })
        .catch((err) => {
          setLoggedIn(false)
          handleTooltipOpen(false, `Не удалось авторизоваться: ${err}`)
        })
    }
  }, [email])

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data.data)
      })
      .catch((err) => {
        handleTooltipOpen(
          false,
          `Не удалось загрузить данные пользователя: ${err}`
        )
      })
  }, [email])

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        handleTooltipOpen(
          false,
          `Не удалось загрузить карточки с сервера: ${err}`
        )
      })
  }, [email])

  React.useEffect(() => {
    const onScreenChange = () => {
      if (window.innerWidth < 620) {
        setMobile(true)
      } else {
        setMobile(false)
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', onScreenChange)

    return () => {
      window.removeEventListener('resize', onScreenChange)
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={isMenuOpen ? 'page page_menu_opened' : 'page'}>
        <Menu
          onSignOut={onSignOut}
          email={email}
          isMenuOpen={isMenuOpen}
        />
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={onSignOut}
          isMenuOpen={isMenuOpen}
          prepareHamburger={prepareHamburger}
          isMobile={isMobile}
        />
        <Switch>
          <Route path="/sign-in">
            <Login onSignIn={onSignIn} />
          </Route>
          <Route path="/sign-up">
            <Register onSignUp={onSignUp} />
          </Route>
          <ProtectedRoute
            path="/cards"
            loggedIn={loggedIn}
            onEditProfile={handleProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={onSubmit}
            component={Main}
          />
          <Route path="/">
            {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <PopupWithTooltip state={tooltipPopupState} onClose={closeAllPopups} />
        <EditAvatarPopup
          state={avatarPopupState}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          state={addPlacePopupState}
          onClose={closeAllPopups}
          onAddCard={handleAddPlace}
        />
        <EditProfilePopup
          state={profilePopupState}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <SubmitPopup
          state={submitPopupState}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
