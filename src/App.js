import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import mascotImage from './mascot.png';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [outfitSuggestion, setOutfitSuggestion] = useState('');

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=89bdfda7d91e7788f8d55c804af5c334`;
      axios.get(url).then((response) => {
        setData(response.data);
        setOutfitSuggestion('');
      }).catch((error) => {
        console.error('Error fetching the weather data:', error);
      });
      setLocation('');
    }
  };

  const showOutfitSuggestions = () => {
    if (outfitSuggestion) {
      setOutfitSuggestion('');
      return;
    }

    if (data.main && data.weather) {
      const tempFahrenheit = data.main.temp;
      const weatherCondition = data.weather[0].main.toLowerCase();
      let suggestion = '';

      if (tempFahrenheit > 85) {
        suggestion = "It's hot outside! Opt for light fabrics like linen or cotton. Consider a breathable tank top, shorts, and open-toe sandals. Don't forget your sunglasses and a hat to protect yourself from the sun.";
      } else if (tempFahrenheit > 70) {
        suggestion = "It's warm! A short-sleeve shirt or blouse with light trousers or a skirt could be comfortable. Sneakers or loafers would work well for footwear.";
      } else if (tempFahrenheit > 55) {
        suggestion = "It's mildly cool. You might want to wear a long-sleeve shirt, a light jacket, and jeans. Closed-toe shoes or boots can keep you comfy.";
      } else if (tempFahrenheit <= 55) {
        suggestion = "It's cold! Dress in heavy layers with a thermal undershirt, a thick sweater, a down jacket, and insulated pants. Don't forget a beanie, gloves, and a scarf.";
      }

      if (weatherCondition.includes('rain')) {
        suggestion += " It's rainy, so wear waterproof outerwear, carry an umbrella, and consider water-resistant shoes.";
      } else if (weatherCondition.includes('snow')) {
        suggestion += " With snow on the forecast, ensure your footwear is insulated and has good grip. A warm hat, gloves, and a scarf are essential.";
      } else if (weatherCondition.includes('clear')) {
        suggestion += " The sky is clear, so enjoy the day! If it's sunny, sunglasses and sunscreen might be a good idea.";
      } else if (weatherCondition.includes('clouds')) {
        suggestion += " It's cloudy, so you might want to bring a light jacket or sweater in case it gets cooler.";
      }

      setOutfitSuggestion(suggestion);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <h1>Climate Companion</h1>
        </a>
      </header>
      <div className="sky">
        <div className="cloud" id="cloud1"></div>
        <div className="cloud" id="cloud2"></div>
        <div className="cloud" id="cloud3"></div>
        <div className="cloud" id="cloud4"></div>
        <div className="cloud" id="cloud5"></div>
        <div className="cloud" id="cloud6"></div>
      </div>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter a city name'
          type="text"
        />
      </div>
      <div className="results-container">
        {data.name && (
          <>
            <div className="api-results">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
              </div>
              <div className="description">
                {data.weather && <p>{data.weather[0].main} - {data.weather[0].description}</p>}
              </div>
              {data.main && (
                <div className="additional-info">
                  <p>Humidity: {data.main.humidity}%</p>
                  <p>Wind Speed: {data.wind.speed} mph</p>
                  {data.main.temp_min && <p>Min Temp: {data.main.temp_min.toFixed()}°F</p>}
                  {data.main.temp_max && <p>Max Temp: {data.main.temp_max.toFixed()}°F</p>}
                  {data.visibility && <p>Visibility: {data.visibility} meters</p>}
                  {data.clouds && <p>Cloudiness: {data.clouds.all}%</p>}
                </div>
              )}
            </div>
            <div className="mascot-section">
              <img src={mascotImage} alt="Climate Companion Mascot" className="mascot" />
              {outfitSuggestion && <div className="outfit-suggestion">{outfitSuggestion}</div>}
              <button onClick={showOutfitSuggestions} className="outfit-suggestion-button">
                Show Outfit Suggestions
              </button>
            </div>
          </>
        )}
      </div>
      <footer>
        ClimateCompanion © 2024
      </footer>
    </div>
  );
}

export default App;
