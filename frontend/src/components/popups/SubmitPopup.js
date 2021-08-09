import React from 'react'
import PopupWithForm from './PopupWithForm'

function SubmitPopup(props) {
  const { state, onClose, onSubmit } = props
  const { open } = state

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <PopupWithForm
      isOpen={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="popup-profile"
      submitText="Подтвердить"
    >
    </PopupWithForm>
  )
}

export default SubmitPopup
