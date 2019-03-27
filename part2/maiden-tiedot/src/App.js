import React, {useState, useEffect} from 'react';
import axios from 'axios'
import CountryList from './Components/CountryList'


const App = () => {
    const [ countries, setCountries] = useState([]) 
    const [ findCountry, setFindCountry] = useState('')

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    const handleFinderChange = (event) => {
        if (event.target.value === ''){
            setFindCountry('')
        } else {
            setFindCountry(event.target.value)
        }
    }

    const handleButtonClick = (countryName) => {
        setFindCountry(countryName)
    }

    return (
        <div class="container" class="text-center">
            <form  >
                <p class="display-4">Find countries:</p>
                <input value={findCountry} onChange={handleFinderChange}/>
            </form>
            <CountryList countries={countries} findCountry={findCountry} handleButtonClick={handleButtonClick}/> 
        </div>
    )
}

export default App;