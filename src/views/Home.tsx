import React, { useEffect, useState } from 'react'
import { Forecast, WeatherToday, WeatherTodayResponse } from '../types/weather'
import { Link } from 'react-router-dom'
import '../assets/css/weather-icons.min.css';
import '../assets/css/weather-icons-wind.min.css';

//constants
import { APPkey } from '../constants/appDefaults'

// styles
import './Home.scss'

interface Props {
	location: {
		state: string
	}
}

const Home: React.FC<Props> = (props) => {
	const [weatherToday, setWeatherToday] = useState<WeatherToday | null>(null)
	const [forecast, setForecast] = useState<Forecast | null>(null)
	const location: string = props.location.state || 'Bratislava'
	const [loading, setloading] = useState<boolean>(true)

	// hook for geting data from server
	useEffect(() => {
		let dataPromises: Array<Promise<void | Response>> = new Array<Promise<Response>>()

		dataPromises.push(
			fetch(
				`https://api.openweathermap.org/data/2.5/weather
				?q=${encodeURI(location)}
				&appid=${APPkey}
				&units=metric`
			)
			.then((res) => res.json())
			.then((res) => {
				let weathResp: WeatherTodayResponse = res
console.log(res)
				setWeatherToday({
					dt: weathResp.dt,
					description: weathResp.weather[0].description,
					clouds: weathResp.clouds.all,
					feels_like: weathResp.main.feels_like,
					humidity: weathResp.main.humidity,
					pressure: weathResp.main.pressure,
					temp: weathResp.main.temp,
					temp_max: weathResp.main.temp_max,
					temp_min: weathResp.main.temp_min,
					cityName: weathResp.name,
					sunrise: weathResp.sys.sunrise,
					sunset: weathResp.sys.sunset,
					weatherId: weathResp.weather[0].id,
					weatherIcon: weathResp.weather[0].icon,
					weatherMain: weathResp.weather[0].main,
					windSpeed: weathResp.wind.speed,
					windDeg: weathResp.wind.deg,
				})
			})
		)
		dataPromises.push(
			fetch(
				`https://api.openweathermap.org/data/2.5/forecast
				?q=${encodeURI(location)}
				&appid=${APPkey}
				&units=metric`
			)
			.then((res) => res.json())
			.then((res) => {
				setForecast(res)
			})
		)
		Promise.all(dataPromises).then(() => {
			setloading(false)
		})
	}, [])

	return !loading  ? (
		<div className="home">
			<div className="LocationRow">
				<Link
					to={{
						pathname: '/Locations',
					}}
				>
					{location}
				</Link>
			</div>
			<div className="WeatherRows">
				<i className={`wi wi-owm-${weatherToday?.weatherId} `}></i>
			</div>
		</div>
	) : (
		<div className="home">
			<div className="LocationRow">
				<Link
					to={{
						pathname: '/Locations',
					}}
				>
					{location}
				</Link>
			</div>
			<div className="WeatherRows">
				<p>Loading data from server</p>
			</div>
		</div>
	)
}

export default Home
