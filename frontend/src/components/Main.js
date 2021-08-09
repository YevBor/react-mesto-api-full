import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props

  const [avatarEditIcon, setAvatarEditIcon] = React.useState(false)
  function showAvatarEditIcon() {
    setAvatarEditIcon(true)
  }
  function hideAvatarEditIcon() {
    setAvatarEditIcon(false)
  }

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={onEditAvatar}
          onMouseEnter={showAvatarEditIcon}
          onMouseLeave={hideAvatarEditIcon}
        >
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
          <div
            className={`profile__avatar-edit-button ${
              avatarEditIcon ? 'profile__avatar-edit-button_visible' : ''
            }`}
          ></div>
        </div>
        <div className="profile__info-container">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button button"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((item) => (
            <Card
              card={item}
              key={item._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
export default Main
