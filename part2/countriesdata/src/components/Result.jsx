import CountryWeather from "./CountryWeather"
import CountryInfo from "./CountryInfo"

const Result = ({countries, handleShowClick}) => {
  if(countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }else if(countries.length > 1){
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>
            {country.name.common} 
            <button onClick={() => handleShowClick(country.name.common)}> Show </button>
          </div>
        ))}
      </div>
    )
  }else if(countries.length === 1){
    const country = countries[0]
    return (
      <div>
        <CountryInfo country={country} />
        <CountryWeather country={country} />
      </div>
    )
  }
}

export default Result