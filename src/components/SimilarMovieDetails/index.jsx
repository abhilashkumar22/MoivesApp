import {Link} from 'react-router'

import SimilarMovies from '../SimilarMovies'

import './index.css'

const SimilarMovieDetails = ({similarMoviesData}) => (
  <div className="similar-movies-container">
    <h1 className="similar-movies-heading">More like this</h1>
    <ul className="similar-movies-list-container">
      {similarMoviesData.map(eachMovieDetails => (
        <Link
          key={eachMovieDetails.id}
          to={`/movies/${eachMovieDetails.id}`}
          className="link-item"
        >
          <SimilarMovies movieDetails={eachMovieDetails} />
        </Link>
      ))}
    </ul>
  </div>
)

export default SimilarMovieDetails
