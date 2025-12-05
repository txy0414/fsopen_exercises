import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Result from './components/Result'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(()=>{
      countriesService
        .getAll()
        .then(initialCountries => {
          setAllCountries(initialCountries)
        })
  }, [])

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchValue(value)
    console.log(value)
    const filteredCountries = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCountries(filteredCountries)
    console.log(filteredCountries.length)
  }

  const handleShowClick = (country)=>{
    countriesService
      .getCountry(country)
      .then(countryData => {
        setFilteredCountries([countryData])
      })
  }

  return (
    <div>
      <div>find countries <input value={searchValue} onChange={handleSearchChange} /> </div>
      <Result countries={filteredCountries} handleShowClick={handleShowClick} />
    </div>
  )
}

export default App
