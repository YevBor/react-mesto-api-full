import React from 'react';

function ImagePopup(props) {
  const { card, onClose } = props;
  const { _id, link, name } = card;

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {onClose()}
  }

  return (
    <div
      className={`popup popup_dark ${_id ? 'popup_opened' : ''}`}
      id="popup-bigpicture"
      onClick={handleOverlayClose}
    >
      <div className="popup__container popup__container_picture">
        <button
          type="button"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <img src={link} className="popup__picture" alt={name} />
        <h2 className="popup__pic-title">{name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
