import {format} from 'date-fns'

import './index.css'

const hoursAndMinutes = runtime => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return `${hours}h ${minutes}m`
}

const MovieDetails = ({movieDetails}) => {
  const {
    title,
    adult,
    runtime,
    releaseDate,
    overview,
    backdropPath,
    genres,
    spokenLanguages,
    budget,
    voteAverage,
    voteCount,
  } = movieDetails

  const releaseYear = format(new Date(releaseDate), 'yyyy')
  const formattedDate = format(new Date(releaseDate), 'do MMMM yyyy')

  return (
    <>
      <div
        className="movie-details-hero"
        style={{backgroundImage: `url(${backdropPath})`}}
      >
        <div className="movie-details-content">
          <h1 className="movie-details-title">{title}</h1>
          <div className="movie-meta">
            <p className="movie-meta-text">{hoursAndMinutes(runtime)}</p>
            <p className="censor-rating">{adult ? 'A' : 'U/A'}</p>
            <p className="movie-meta-text">{releaseYear}</p>
          </div>
          <p className="movie-details-overview">{overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
      <div className="movie-info-container">
        <div className="movie-info-column">
          <h1 className="movie-info-heading">Genres</h1>
          {genres.map(each => (
            <p className="movie-info-text" key={each.id}>
              {each.name}
            </p>
          ))}
        </div>
        <div className="movie-info-column">
          <h1 className="movie-info-heading">Audio Available</h1>
          {spokenLanguages.map(each => (
            <p className="movie-info-text" key={each.id}>
              {each.englishName}
            </p>
          ))}
        </div>
        <div className="movie-info-column">
          <h1 className="movie-info-heading">Rating Count</h1>
          <p className="movie-info-text">{voteCount}</p>
          <h1 className="movie-info-heading">Rating Average</h1>
          <p className="movie-info-text">{voteAverage}</p>
        </div>
        <div className="movie-info-column">
          <h1 className="movie-info-heading">Budget</h1>
          <p className="movie-info-text">{budget}</p>
          <h1 className="movie-info-heading">Release Date</h1>
          <p className="movie-info-text">{formattedDate}</p>
        </div>
      </div>
    </>
  )
}

export default MovieDetails
