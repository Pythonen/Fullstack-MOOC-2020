import React from 'react';

const Weather = ({ weather }) => {
    console.log(weather)
    return (
        <>
            <h4>Weather in {weather.location.name}</h4>
            <p><strong>temperature: </strong>{weather.current.temperature} °C</p>
            <img src={weather.current.weather_icons[0]}></img>
            <p><strong>wind: </strong>{weather.current.wind_speed} mph {weather.current.wind_dir}</p>
        </>
    )
}

export default Weather