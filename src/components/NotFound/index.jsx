import notFoundImg from '../../assets/not-found.jpg'
import {Link} from 'react-router'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      alt="not found"
      className="not-found-image"
      src={notFoundImg}
    />
    <h1 className="not-found-heading">Lost Your Way ?</h1>
    <p className="not-found-paragraph">
      Sorry, we cannot find that page. You will find lots to explore on the home
      page
    </p>
    <Link to="/">
      <button type="button" className="go-home-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
