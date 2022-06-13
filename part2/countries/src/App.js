import {useState, useEffect} from 'react'
import axios from 'axios'

const FilterWidget = ({handler, filterString}) => {
  return (
    <div>Find countries <input onChange={handler} value={filterString}/></div>
  )
}

const CountryList = ({countries, filterString, setFilterString, currentWeather, setCurrentWeather}) => {
  
  const rawFilter = filterString.toLowerCase()
  const shownCountries = countries.filter(c => c.name.common.toLowerCase().startsWith(rawFilter))
  
  if(shownCountries.length <= 10 && shownCountries.length > 1) {
    return (
      <div>
        {shownCountries.map(c => <Country key={c.name.official} country={c} setFilterString={setFilterString} />)}
      </div>
    )
  }
  
  if(shownCountries.length === 1) {
    return (
      <div>
        <CountryInfo country={shownCountries[0]} currentWeather={currentWeather} setCurrentWeather={setCurrentWeather} />
      </div>
    )
  }
  
  if(shownCountries.length === 0) {
    return (
      <div>
        No matches.
      </div>
    )
  }

  return (
    <div>
      Too many matches, specify another filter.
    </div>
  )
  
}

// TODO: Error handling
const CountryInfo = ({country, currentWeather, setCurrentWeather}) => {
  
  debugger
  const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
  
  useEffect(() => {
    console.log('Calling location API')
    axios
      .get(locationUrl)
      .then((response) => {
        console.log('Response from location API ->', response.data)
        const lat = response.data[0].lat
        const lon = response.data[0].lon
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        console.log('Calling weather API')
        axios
          .get(weatherUrl)
          .then((response) => {
            console.log('Response from weather API ->', response.data)
            const weatherObject = {
              temp: response.data.main.temp,
              wind: response.data.wind.speed,
              iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            }
            console.log('Setting weather to ->', weatherObject)
            setCurrentWeather(weatherObject)
          })
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map(name => <li key={name}>{name}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
      <h2>Weather in {country.capital}</h2>
      <div>Temperature: {currentWeather.temp} Celsius </div>
      <img src={currentWeather.iconUrl} alt={'Icon of current weather'} />
      <div>Wind: {currentWeather.wind} m/s </div>
    </div>
  )
}

const Country = ({country, setFilterString}) => {
  const setFilterToThisCountry = () => {
    console.log('Setting filter to ->', country.name.common)
    setFilterString(country.name.common)
  }
  return (
    <div>
      {country.name.common}
      <button onClick={setFilterToThisCountry}>Show</button>
    </div>
  )
}

const App = () => {

  const [filterString, setFilterString] = useState('')
  const [countries, setCountries] = useState([])
  const [currentWeather, setCurrentWeather] = useState({ temp: 'Not available', wind: 'Not available', iconUrl: 'Not available' })

  const handleFilterStringChange = (event) => setFilterString(event.target.value)

  useEffect(() => {
    console.log('Using effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        console.log('Data from server ->', response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <FilterWidget handler={handleFilterStringChange} filterString={filterString}/>
      <CountryList
        countries={countries}
        filterString={filterString}
        setFilterString={setFilterString}
        currentWeather={currentWeather}
        setCurrentWeather={setCurrentWeather}
       />
    </div>
  )
}

export default App