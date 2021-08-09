import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const { state, onClose, onAddCard } = props
  const { open } = state

  const [place, setPlace] = React.useState('')
  function handleChangePlace(e) {
    setPlace(e.target.value)
  }

  const [link, setLink] = React.useState('')
  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddCard({
      name: place,
      link,
    })
    setPlace('');
    setLink('');
  }

  return (
    <PopupWithForm
      isOpen={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="popup-addcard"
      submitText="Сохранить"
    >
      <input
        type="text"
        className="popup__form-input"
        id="place"
        name="place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={place}
        onChange={handleChangePlace}
      />
      <div className="popup__form-error-container">
        <span className="place-error popup__form-error"></span>
      </div>
      <input
        type="url"
        className="popup__form-input"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <div className="popup__form-error-container">
        <span className="link-error popup__form-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
