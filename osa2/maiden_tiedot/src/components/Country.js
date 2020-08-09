import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather'
const Country = ({ country }) => {
    let api_key = 'cd3fffa65599661a51cf816119d30ecf';

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(res => setWeather(res.data))
    },[])

    return(
    <>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h4>Languages</h4>
        <ul>
            {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
        </ul>
        <img alt="flag" src={country.flag} width="150" ></img>
        {weather && <Weather weather={weather}/>}
    </>
    )}   

export default Country