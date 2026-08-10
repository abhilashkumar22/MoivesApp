import {Link} from 'react-router'

import './index.css'

const MovieItem = ({movieDetails}) => {
  const {id, title, posterPath} = movieDetails

  return (
    <li className="movie-icon-item">
      <Link to={`/movies/${id}`} className="link-item">
        <img className="movie-image" alt={title} src={posterPath} />
      </Link>
    </li>
  )
}

export default MovieItem
