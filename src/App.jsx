import Sam2 from "./components/Sam2"
import "./css/App.css";
import searchLogo from "./assets/search-icon-png-21.png";
import snowlogo from "./assets/snow.jpeg";
import humiditylogo from "./assets/humidity.png";
import windspeedlogo from "./assets/wind-speed.jpg";
import { useState } from "react";

const Weatherdetails=({icon,temp,city,country,lat,lon,humidity,windspeed,humidityp,windspeedp})=>{
  return (
    <>
        <div className="col-12 d-flex flex-row justify-content-center">
            <div className="image">
                <img src={icon}alt="Image"/>
            </div>
            <br></br>
        </div>
        <div className="col-12 d-flex flex-row justify-content-center temp">{temp}'C</div>
        <div className="col-12 d-flex flex-row justify-content-center city">{city}</div>
        <div className="Country col-12 d-flex flex-row justify-content-center">{country}</div>
        <div className="col-12 d-flex flex-row justify-content-center">
            <div className="card2">
                <span className="lat">latitude</span>
                <br/>
                <span>{lat}</span>
            </div>
            <div className="card2">
                <span className="lon">longitude</span>
                <br/>
                <span>{lon}</span>
            </div>
        </div>
        <div className="col-12 d-flex flex-row justify-content-center">
            <div className="card3">
                <img src={humidity} class="img2" alt="Image"/>
                <div className="humidity-percent">{humidityp}%</div>
                <div>Humidity</div>
            </div>
            <div className="card5">
                <img src={windspeed} class="img2" alt="Image"/>
                <div className="humidity-percent">{windspeedp}km/hr</div>
                <div>Wind Speed</div>
            </div>
        </div>
        <div className="card5">
        <h1 className="head1">Designed By Mohamed Rasheq A</h1>
        </div>
    </>
  )
}

function App() {
  const [icon,setIcon]=useState(snowlogo);
  const [humidity,setHumidity]=useState(humiditylogo);
  const [windspeed,setWindspeed]=useState(windspeedlogo);
  const [temp,setTemp]=useState(0);
  const [humidityp,setHumidityp]=useState(0);
  const [windspeedp,setWindspeedp]=useState(0);
  const [city, setCity]=useState("Trichy");
  const [country, setCountry]=useState("TN");
  const [lat, setLat]=useState(0);
  const [lon, setLon]=useState(0);
  const [Text, setText]=useState("chennai");
  const [cityNotFound , setCityNotFound]=useState(false);
  const [loading, setLoading]=useState(false);


  const search=async()=>{
              setLoading(true);
              let url=`https://api.openweathermap.org/data/2.5/weather?q=${Text}&appid=7ae89ab65df4c2cb49d1009d86823e10&units=Metric`;
              try{
              let res =await fetch(url);
              let data =await res.json();
              if(data.cod==="404")
              {
                setCityNotFound(true);
                setLoading(false);
                console.log("City not Found");
                return;
              }
              setHumidityp(data.main.humidity);
              setWindspeedp(data.wind.speed);
              setTemp(Math.floor(data.main.temp));
              setCity(data.name);
              setCountry(data.sys.country);
              setLat(data.coord.lat);
              setLon(data.coord.lon)
              }catch(error)
              {
                console.error("An error occurred",error.message);
              }
              finally{
                setLoading(false);
              }
  };
  const handleCity=(e)=>{
setText(e.target.value);
  };
  const handleKeyDown=(e)=>
  {
    if(e.key==="Enter")
    {
      search();
    }
  };
  return (
    
    <>
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex flex-row justify-content-center">
          <div class="card4">
            <input type="text" className="cityInput" placeholder="Search City" onChange={handleCity} value={Text} onKeyDown={handleKeyDown}/>
          </div>
          <div className="search-icon" onClick={()=>search()}>
            <img src={searchLogo} alt="Search" className="img3"/>
          </div>
        </div>
        <Weatherdetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} windspeed={windspeed} humidityp={humidityp} windspeedp={windspeedp}/>
      </div>
    </div>
    </>
  )
}

export default App
