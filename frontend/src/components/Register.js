import React from 'react';
import { Link } from 'react-router-dom';


function Register(props) {

  const { onSignUp } = props;

  const [email, setEmail] = React.useState('')
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  const [password, setPassword] = React.useState('')
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('делаю запрос')
    onSignUp({
      password,
      email
    })
  }

  return (
    <main className="content">
      <div className="login-container">
        <form className="login-form" noValidate onSubmit={handleSubmit}>
          <h2 className="login-form__title">Регистрация</h2>
          <input
            type="email"
            className="login-form__input"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={handleChangeEmail}
          />
          <div className="popup__form-error-container">
            <span className="email-error popup__form-error"></span>
          </div>
          <input
            type="password"
            className="login-form__input"
            id="password"
            name="password"
            placeholder="Пароль"
            required
            value={password}
            onChange={handleChangePassword}
          />
          <div className="popup__form-error-container">
            <span className="password-error popup__form-error"></span>
          </div>
          <button type="submit" className="login-form__button button" >
            Зарегистрироваться
          </button>
          <Link className="login-form__bottomlink button" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </main>
  )
}

export default Register;
