import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(res => {
          setCountries(res.data)
        })
  })
  
  const handleInputChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

   const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div>
      <p>find countries: <input onChange={handleInputChange}/></p>

      {filteredCountries.length > 10 && <p>too many results...</p>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1
      && filteredCountries.map(country => {
        return(<p key={country.name}>{country.name} <button onClick={() => setFilter(country.name)}>show</button></p>)
      })}

      {filteredCountries.length === 1 && filteredCountries.map(country => 
      <Country key={country.name} country={country}/>)}
    </div>
  );
}

export default App;
