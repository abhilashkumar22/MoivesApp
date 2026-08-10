import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import ReactSlick from '../ReactSlick'
import endpoints from '../endpoints'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const formatMovies = results =>
  results.map(eachMovie => ({
    id: eachMovie.id,
    posterPath: eachMovie.poster_path,
    backdropPath: eachMovie.backdrop_path,
    overview: eachMovie.overview,
    title: eachMovie.title,
  }))

const fetchMovies = async apiUrl => {
  const jwtToken = Cookies.get('jwt_token')
  const options = {
    headers: {Authorization: `Bearer ${jwtToken}`},
    method: 'GET',
  }
  const response = await fetch(apiUrl, options)
  if (!response.ok) {
    throw new Error('failed')
  }
  const data = await response.json()
  return formatMovies(data.results)
}

const Home = () => {
  const [trendingStatus, setTrendingStatus] = useState(apiStatusConstants.initial)
  const [trendingMovies, setTrendingMovies] = useState([])

  const [originalsStatus, setOriginalsStatus] = useState(apiStatusConstants.initial)
  const [originalsMovies, setOriginalsMovies] = useState([])

  const [topRatedStatus, setTopRatedStatus] = useState(apiStatusConstants.initial)
  const [topRatedMovies, setTopRatedMovies] = useState([])

  const [randomMovie, setRandomMovie] = useState(null)

  const getTrendingMovies = async () => {
    setTrendingStatus(apiStatusConstants.inProgress)
    try {
      const movies = await fetchMovies(endpoints.trendingMoviesApi)
      setTrendingMovies(movies)
      setTrendingStatus(apiStatusConstants.success)
    } catch {
      setTrendingStatus(apiStatusConstants.failure)
    }
  }

  const getOriginals = async () => {
    setOriginalsStatus(apiStatusConstants.inProgress)
    try {
      const movies = await fetchMovies(endpoints.originalsApi)
      setOriginalsMovies(movies)
      setRandomMovie(movies[Math.floor(Math.random() * movies.length)])
      setOriginalsStatus(apiStatusConstants.success)
    } catch {
      setOriginalsStatus(apiStatusConstants.failure)
    }
  }

  const getTopRatedMovies = async () => {
    setTopRatedStatus(apiStatusConstants.inProgress)
    try {
      const movies = await fetchMovies(endpoints.topRatedMoviesApi)
      setTopRatedMovies(movies)
      setTopRatedStatus(apiStatusConstants.success)
    } catch {
      setTopRatedStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getTrendingMovies()
    getOriginals()
    getTopRatedMovies()
  }, [])

  const renderHero = () => {
    if (originalsStatus === apiStatusConstants.success && randomMovie !== null) {
      return (
        <div
          className="home-hero-container"
          style={{backgroundImage: `url(${randomMovie.backdropPath})`}}
        >
          <Header />
          <div className="hero-content">
            <h1 className="hero-title">{randomMovie.title}</h1>
            <p className="hero-overview">{randomMovie.overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className="home-hero-plain">
        <Header />
      </div>
    )
  }

  return (
    <div className="home-container">
      {renderHero()}
      <div className="home-sections">
        <h1 className="section-heading">Trending Now</h1>
        <ReactSlick
          apiStatus={trendingStatus}
          moviesList={trendingMovies}
          retryFn={getTrendingMovies}
        />
        <h1 className="section-heading">Originals</h1>
        <ReactSlick
          apiStatus={originalsStatus}
          moviesList={originalsMovies}
          retryFn={getOriginals}
        />
        <h1 className="section-heading">Top Rated</h1>
        <ReactSlick
          apiStatus={topRatedStatus}
          moviesList={topRatedMovies}
          retryFn={getTopRatedMovies}
        />
      </div>
      <Footer />
    </div>
  )
}

export default Home
