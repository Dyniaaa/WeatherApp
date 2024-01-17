import "./App.scss";
import "./styles/reset.scss";

let APIkey = "43816cf33606745c862470b710248ad3";

function App() {
  function fetchData() {
    let cityName = document.querySelector(".cityName").value;
    let weatherIconDiv = document.querySelector(".weatherIconDiv");
    let weatherMain = document.querySelector(".weatherMain");
    let weatherDescription = document.querySelector(".weatherDescription");
    let name = document.querySelector(".name");
    let temp = document.querySelector(".temp");
    let tempMin = document.querySelector(".tempMin");
    let tempMax = document.querySelector(".tempMax");
    let weatherIcon = document.querySelector(".weatherIcon");

    if (weatherIcon) {
      weatherIconDiv.removeChild(weatherIcon);
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // ICON
        var newImg = document.createElement("img");
        newImg.classList.add("weatherIcon");
        newImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherIconDiv.appendChild(newImg);
        // CityName
        name.innerHTML = data.name;
        // Weather
        weatherMain.innerHTML = data.weather[0].main;
        weatherDescription.innerHTML = data.weather[0].description;
        //Temp
        temp.innerHTML = Math.round(data.main.temp) + "&#176;C";
        tempMax.innerHTML =
          "Max. " + Math.round(data.main.temp_max) + "&#176;C";
        tempMin.innerHTML =
          "Min. " + Math.round(data.main.temp_min) + "&#176;C";
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  return (
    <div className="App">
      <div className="weatherIconDiv"></div>
      <p className="name"></p>
      <p className="weatherMain"></p>
      <p className="weatherDescription"></p>
      <p className="temp"></p>
      <div className="tempDiv">
        <p className="tempMax"></p>
        <p className="tempMin"></p>
      </div>
      <div className="searchBar">
        <input
          type="text"
          plceholder="Enter the city"
          className="cityName"
        ></input>
        <button onClick={fetchData}>OK</button>
      </div>
    </div>
  );
}

export default App;
