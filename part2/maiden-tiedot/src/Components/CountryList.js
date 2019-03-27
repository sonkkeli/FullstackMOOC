import React from 'react';
import Weather from './Weather'

const CountryList = ({countries, findCountry, handleButtonClick}) => {

    const matchingCountriesList = countries.filter(
        countries => countries.name.toLowerCase().includes(findCountry.toLowerCase())
    )
    
    if (matchingCountriesList.length === 1){
        return (
            <div class="jumbotron">
                <h1 class="display-3">{matchingCountriesList[0].name}</h1>
                <p>capital {matchingCountriesList[0].capital}</p>
                <p>population {matchingCountriesList[0].population}</p>
                <h3 class="display-4">languages </h3>
                {matchingCountriesList[0]
                    .languages
                    .map(
                        language => 
                        <p key={language.name}>{language.name}</p>
                    )}
                
                <img src={matchingCountriesList[0].flag} alt="flag" style={{width: 200}}/>
                <Weather capital={matchingCountriesList[0].capital}/>
            </div>                
        )

    } else if (matchingCountriesList.length <= 10){
        return (
            matchingCountriesList
            .map(
                country => 
                <p key={country.name}>{country.name} <button onClick={() => handleButtonClick(country.name)}>show</button> </p>)
        )
        
    } else {
        return (
            <p>Too many matches, please specify another filter</p>
        )
    }
}

export default CountryList;