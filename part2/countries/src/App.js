import {useState, useEffect} from 'react'
import axios from 'axios'

const FilterWidget = ({handler, filterString}) => {
  return (
    <div>Find countries <input onChange={handler} value={filterString}/></div>
  )
}

const CountryList = ({countries, filterString}) => {
  
  const rawFilter = filterString.toLowerCase()
  const shownCountries = countries.filter(c => c.name.common.toLowerCase().startsWith(rawFilter))
  
  if(shownCountries.length <= 10 && shownCountries.length > 1) {
    return (
      <div>
        {shownCountries.map(c => <Country key={c.name.official} country={c}/>)}
      </div>
    )
  }
  
  if(shownCountries.length === 1) {
    return (
      <div>
        <CountryInfo country={shownCountries[0]} />
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

const CountryInfo = ({country}) => {
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
    </div>
  )
}

const Country = ({country}) => {
  return (
    <div>{country.name.common}</div>
  )
}

const App = () => {

  const [filterString, setFilterString] = useState('')
  const [countries, setCountries] = useState([])

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
      <CountryList countries={countries} filterString={filterString}/>
    </div>
  )
}

export default App