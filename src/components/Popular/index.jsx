import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'

import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import endpoints from '../endpoints'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Popular = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [popularMoviesData, setPopularMoviesData] = useState([])

  const getPopularMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(endpoints.popularMoviesApi, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      setPopularMoviesData(updatedData.filter(m => m.posterPath !== null))
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <BeatLoader color="#D81F26" size={15} />
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
      <button type="button" className="retry-button" onClick={getPopularMovies}>
        Try Again
      </button>
    </div>
  )

  const renderPopularMoviesView = () => (
    <ul className="popular-movies-container">
      {popularMoviesData.map(eachMovie => (
        <MovieItem movieDetails={eachMovie} key={eachMovie.id} />
      ))}
    </ul>
  )

  const renderPopularData = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPopularMoviesView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="popular-container">
      <Header />
      {renderPopularData()}
      <Footer />
    </div>
  )
}

export default Popular
