import React, {useState} from 'react';
import {render} from "react-dom";
import axios from 'axios';


const WeatherApp = () => {
    const [temperature, setTemperature] = useState('');
    const [city, setCity] = useState("Москва");
    const [country, setCountry] =useState('RU');

    const getWeatherData = (city, country) => {
        axios({
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=a55b0030b8724cc2512469446eb8a7f6`
        })
            .then(response => {
                const tempCelsius = response.data.main.temp - 272.1;
                setTemperature(tempCelsius);
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <>
            <div style={{marginLeft: "33%"}}>
                <div
                style={{
                    height: '150px',
                    width: '450px',
                    background: '#94e5ff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '25px'
                }}
                >
                    <br/>
                    Погода в городе {city}
                    <br/>
                    Температура {Math.round(temperature * 100) / 100}°С
                    <br/>
                    Время: {new Date().toLocaleString('ru-RU')}
                </div>
                <br/>
                <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <button
                    onClick={() => getWeatherData(city, country)}
                >
                    Узнать погоду
                </button>
            </div>
        </>
    )
};

render(<WeatherApp />, document.querySelector('#root'));
