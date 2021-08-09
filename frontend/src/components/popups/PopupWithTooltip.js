import React from 'react'
import sucess from '../../images/sucess.png'
import fail from '../../images/fail.png'

function PopupWithTooltip(props) {
  const { state, onClose } = props
  const { open, result, message } = state

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      onClose()
    }
  }

  return (
    <div
      className={`popup ${open ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container popup__container_tooltip">
        <button
          type="button"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <img
          src={result ? sucess : fail}
          className="popup__tooltip-image"
          alt={result ? 'Успех!' : 'Ошибка!'}
        />
        <h2 className="popup__tooltip-title">
          {result
            ? 'Вы успешно зарегистрировались!'
            : `Что-то пошло не так!
Попробуйте ещё раз.`}
        </h2>
        <p className="popup__tooltip-message">{message}</p>
      </div>
    </div>
  )
}

export default PopupWithTooltip
