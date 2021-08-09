import React from 'react'
import logo from '../images/logo-white.svg'
import { Link, NavLink } from 'react-router-dom'

function Header(props) {
  const { email, loggedIn, onSignOut, isMenuOpen, prepareHamburger, isMobile } = props



  const signedOut = (
    <nav className="nav">
      <NavLink
        to="/sign-up"
        className="nav__link button"
        activeClassName="nav__link_hidden"
      >
        Регистрация
      </NavLink>
      <NavLink
        to="/sign-in"
        className="nav__link button"
        activeClassName="nav__link_hidden"
      >
        Войти
      </NavLink>
    </nav>
  )

  const signedInDesktop = (
    <nav className="nav">
      <p className="nav__mail">{email}</p>
      <Link
        to="/sign-in"
        className="nav__link button shadow"
        onClick={onSignOut}
      >
        Выйти
      </Link>
    </nav>
  )

  const signedInMobile = (
  <nav className="nav">

    <button className="nav__button" type="button" onClick={prepareHamburger}>
      <div className={`nav__button-line ${isMenuOpen && 'nav__button-line_closing'}`}></div>
      <div className={`nav__button-line ${isMenuOpen && 'nav__button-line_closing'}`}></div>
      <div className={`nav__button-line ${isMenuOpen && 'nav__button-line_closing'}`}></div>
    </button>
  </nav>)

  function menu() {
    if (!loggedIn) {
      return signedOut
    } else if (!isMobile) {
      return signedInDesktop
    } else {
      return signedInMobile
    }
  }

  return (
    <>

      <header className="header">
        <img
          src={logo}
          alt="Логотип: надпись Mesto.Russia"
          className="header__logo"
        />

        {menu()}
      </header>
    </>
  )
}

export default Header
