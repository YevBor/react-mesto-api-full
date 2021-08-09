import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const { state, onClose, onUpdateUser } = props
  const { open } = state
  const currentUser = React.useContext(CurrentUserContext)

  const [name, setName] = React.useState('')
  function handleChangeName(e) {
    setName(e.target.value)
  }

  const [description, setDescription] = React.useState('')
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name,
      about: description,
    })
  }

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  return (
    <PopupWithForm
      isOpen={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="popup-profile"
      submitText="Сохранить"
    >
      <input
        type="text"
        className="popup__form-input"
        id="name"
        name="name"
        placeholder="Введите имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
      />
      <div className="popup__form-error-container">
        <span className="name-error popup__form-error"></span>
      </div>
      <input
        type="text"
        className="popup__form-input"
        id="about"
        name="about"
        placeholder="А чем заниметесь?"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
      />
      <div className="popup__form-error-container">
        <span className="about-error popup__form-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
