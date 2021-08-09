import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props
  const { name, link, likes } = card

  function handleClick() {
    onCardClick(card)
  }

  function handleLileClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id

  const cardDeleteButtonClassName = `button card__trash-button ${
    !isOwn && 'card__trash-button_hidden'
  }`

  const isLiked = card.likes.some((i) => i === currentUser._id )

  const cardLikeButtonClassName = `button card__like ${
    isLiked && 'card__like_active'
  }`

  return (
    <li className="card">
      <img
        src={link}
        className="card__image button"
        alt={name}
        onClick={handleClick}
      />
      <div className="card__alt">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLileClick}
          />
          <p className="card__like-number">{likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
    </li>
  )
}

export default Card
