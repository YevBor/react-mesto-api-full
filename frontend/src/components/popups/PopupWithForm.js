import React from 'react';

function PopupWithForm(props) {
  const { isOpen, onClose, onSubmit, name, title, submitText, children } = props;

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {onClose()}
  }

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={name} onClick={handleOverlayClose} >
      <div className="popup__container popup__container_form">
        <button
          type="button"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="popup__form-title">{title}</h2>
          {children}
          <button type="submit" className="popup__form-submit-button button">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
