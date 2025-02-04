
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

const key = '0e765b1db802c8961005905c1a0f1fc0'

function App() {

  const [weather, setWeather] = useState()
  const [coords, setCoords] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const success= (pos) => {
    setCoords({
      lat: pos.coords.latitude, 
      lon: pos.coords.longitude,
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])


  

    useEffect(() => {
      if(coords){
      const {lat, lon} = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
      axios.get(url)
      .then(res => {
        const kel = res.data.main.temp;
        const cel = (kel - 273.15).toFixed(2);
        const fah = (cel * 9/5 + 32).toFixed(2);
        setTemp({cel: cel, fah: fah})
        setWeather(res.data)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      })
    }
  }, [coords])
    
  return (
    <>
      <div className='app'>
          {
            isLoading ?
              <figure className='app__img'>
                <img src='https://cssbud.com/wp-content/uploads/2022/05/clouds-spinner.gif' alt="isLoading" />
              </figure> 
              :
              <WeatherCard
              weather={weather}
              temp={temp}
            />
          }
      </div>
          </>
  )
}

export default App
