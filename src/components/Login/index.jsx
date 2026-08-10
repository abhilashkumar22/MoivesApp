import logo from '../../assets/logo.png'
import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router'
import Cookies from 'js-cookie'

import endpoints from '../endpoints'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    navigate('/', {replace: true})
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(endpoints.loginApi, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      setShowError(true)
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <img
        alt="login website logo"
        className="login-website-logo"
        src={logo}
      />
      <form className="login-form" onSubmit={onSubmitForm}>
        <h1 className="login-heading">Login</h1>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="login-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {showError && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
