import React from 'react'


function Menu(props) {
  const { onSignOut, email, isMenuOpen } = props

  return (
    <div className={isMenuOpen ? 'nav__container nav__container_active' : 'nav__container'}>
    <p className="nav__item">{email}</p>
    <p
      className="nav__item button shadow"
      onClick={onSignOut}
    >
      Выйти
    </p>
  </div>
  )
}

export default Menu;
