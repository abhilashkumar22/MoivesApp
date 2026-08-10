import {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import Cookies from 'js-cookie'
import ClipLoader from 'react-spinners/ClipLoader'

import Header from '../Header'
import Footer from '../Footer'
import MovieDetails from '../MovieDetails'
import SimilarMovieDetails from '../SimilarMovieDetails'
import endpoints from '../endpoints'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MovieItemDetails = () => {
  const {id} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [movieDetails, setMovieDetails] = useState(null)
  const [similarMoviesData, setSimilarMoviesData] = useState([])

  const getMovieItemDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const apiUrl = `${endpoints.getMovieItemDetailsApi}/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const each = fetchedData.movie_details
      setMovieDetails({
        id: each.id,
        title: each.title,
        adult: each.adult,
        runtime: each.runtime,
        budget: each.budget,
        overview: each.overview,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
        genres: each.genres.map(g => ({id: g.id, name: g.name})),
        spokenLanguages: each.spoken_languages.map(l => ({
          id: l.id,
          englishName: l.english_name,
        })),
      })
      setSimilarMoviesData(
        each.similar_movies
          .filter(m => m.poster_path !== null)
          .map(m => ({
            id: m.id,
            title: m.title,
            posterPath: m.poster_path,
          })),
      )
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getMovieItemDetails()
  }, [id])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ClipLoader color="#D81F26" size={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
      />
      <p className="failure-view-heading">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={getMovieItemDetails}
      >
        Try Again
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <>
      <MovieDetails movieDetails={movieDetails} />
      <SimilarMovieDetails similarMoviesData={similarMoviesData} />
    </>
  )

  const renderMovieItemDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="movie-item-details-container">
      <Header />
      {renderMovieItemDetails()}
      <Footer />
    </div>
  )
}

export default MovieItemDetails
