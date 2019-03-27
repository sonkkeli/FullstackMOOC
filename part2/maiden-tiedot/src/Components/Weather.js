import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Weather = ({capital}) => {
    const [loaded, setLoaded] = useState(false)
    const [ weather, setWeather] = useState([]) 

    useEffect(() => {
        axios
        .get(`http://api.apixu.com/v1/current.json?key=05cf133b2d5b4126861130046192703&q=${capital}`)
        .then(response => {
            setWeather(response.data)
            console.log(weather)
            setLoaded(true)
        })
    }, [])

    const showWeather = () => {
        if (loaded){
            return (
                <div>
                    <p><strong>temperature: </strong>{weather.current.temp_c} Celsius</p>
                    <img src={weather.current.condition.icon} alt={weather.current.condition.text}/> 
                    <p><strong>wind: </strong>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' alt="loading..." style={{width:100}}/>
                </div>
            )
        }
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            {showWeather()}
        </div>
    )
}

export default Weather;