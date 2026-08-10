import noMovies from '../../assets/no-movies.png'
import {useState} from 'react'
import Cookies from 'js-cookie'
import BeatLoader from 'react-spinners/BeatLoader'

import MovieItem from '../MovieItem'
import Header from '../Header'
import Footer from '../Footer'
import endpoints from '../endpoints'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchedValue, setSearchedValue] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchedMoviesData, setSearchedMoviesData] = useState([])

  const getMovies = async (value = searchInput) => {
    const trimmedValue = value.trim()
    setSearchedValue(trimmedValue)

    if (trimmedValue === '') {
      setSearchedMoviesData([])
      setApiStatus(apiStatusConstants.success)
      return
    }

    setApiStatus(apiStatusConstants.inProgress)
    const searchedMoviesUrl = `${endpoints.searchMoviesApi}?search=${trimmedValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(searchedMoviesUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      setSearchedMoviesData(updatedData.filter(m => m.posterPath !== null))
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const getMoviesWithInitialValue = () => {
    getMovies(searchInput)
  }

  const changeSearchInput = value => {
    setSearchInput(value)
  }

  const renderNoMoviesView = () => (
    <div className="not-found-search-container">
      <img
        alt="no movies"
        className="not-found-search-image"
        src={noMovies}
      />
      <p className="not-found-search-paragraph">
        Your search for {searchedValue} did not find any matches.
      </p>
    </div>
  )

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
      <button
        type="button"
        className="retry-button"
        onClick={getMoviesWithInitialValue}
      >
        Try Again
      </button>
    </div>
  )

  const renderSearchedMoviesDataView = () =>
    searchedMoviesData.length === 0 ? (
      renderNoMoviesView()
    ) : (
      <ul className="search-movies-container">
        {searchedMoviesData.map(eachMovie => (
          <MovieItem movieDetails={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    )

  const renderSearchData = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSearchedMoviesDataView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="home-search-container">
      <Header
        getMoviesWithInitialValue={getMoviesWithInitialValue}
        changeSearchInput={changeSearchInput}
        searchInput={searchInput}
      />
      {renderSearchData()}
      <Footer />
    </div>
  )
}

export default Search