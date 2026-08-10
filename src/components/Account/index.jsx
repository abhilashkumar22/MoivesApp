import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') ?? ''
  const password = localStorage.getItem('password') ?? ''

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <div className="account-page-container">
      <Header />
      <div className="account-container">
        <h1 className="account-heading">Account</h1>
        <hr className="account-separator" />
        <div className="account-row">
          <p className="account-label">Member ship</p>
          <div>
            <p className="account-value">{username}</p>
            <p className="account-value">
              Password: {'*'.repeat(password.length)}
            </p>
          </div>
        </div>
        <hr className="account-separator" />
        <div className="account-row">
          <p className="account-label">Plan details</p>
          <div className="plan-details">
            <p className="account-value">Premium</p>
            <p className="ultra-hd">Ultra HD</p>
          </div>
        </div>
        <hr className="account-separator" />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Account
