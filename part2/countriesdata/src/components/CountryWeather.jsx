import { useState, useEffect } from 'react';

const CountryWeather = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const api = import.meta.env.VITE_SOME_KEY;
                const lat = country.capitalInfo.latlng[0];
                const lon = country.capitalInfo.latlng[1];
                
                const response = await fetch(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${api}`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [country]); // Add country as dependency

    if (loading) return <div>Loading weather...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!weather || !weather.daily || weather.daily.length === 0) return <div>No weather data available</div>;

    // Convert temperature from Kelvin to Celsius
    const tempCelsius = weather.daily[0].temp.day - 273.15;

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <div>Temperature: {tempCelsius.toFixed(1)} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.daily[0].weather[0].icon}@2x.png`} alt={`Weather icon is ${weather.daily[0].weather[0].main}`} />
            <div>Wind: {weather.daily[0].wind_speed} m/s</div>
        </div>
    );
};

export default CountryWeather