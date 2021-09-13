import React, { useEffect, useState } from 'react'
import { Forecast, WeatherToday, WeatherTodayResponse } from '../types/weather'
import { Link } from 'react-router-dom'
import '../assets/css/weather-icons.min.css'
import '../assets/css/weather-icons-wind.min.css'
import LocationIcon from '../assets/location-icon.svg'

//constants
import { APPkey } from '../constants/appDefaults'

//components
import WeatherInfoEl from '../components/WeatherInfoEl'
import TemperatureEl from '../components/TemperatureEl'

// styles
import './Home.scss'
import ForecastInfoEl from '../components/ForecastInfoEl'
import { LocationLatLon } from '../constants/defaultLocations'

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
				`https://api.openweathermap.org/data/2.5/onecall
				?lat=${LocationLatLon.get(location)?.lat}
				&lon=${LocationLatLon.get(location)?.lon}
				&exclude=hourly,minutely
				&appid=${APPkey}
				&units=metric`
			)
				.then((res) => res.json())
				.then((res) => {
					let forecastResp: Forecast = res
					setForecast(forecastResp)
				})
		)
		Promise.all(dataPromises).then(() => {
			setloading(false)
		})
	}, [location])

	const getDatetime = (sunset: number, sunrise: number) => {
		let timeDiff = sunset - sunrise
		return (
			Math.floor(timeDiff / 3600) + 'h ' + Math.floor((timeDiff % 3600) / 60) + 's'
		)
	}

	const getTimeFromDate = (dt: number) => {
		let date = new Date(dt)
		return `${date.getHours()}:${date.getMinutes()}`
	}

	return !loading ? (
		<div className="home">
			<div className="locationRow">
				<Link
					to={{
						pathname: '/Locations',
					}}
				>
					{location} <img src={LocationIcon} alt="location" />
				</Link>
			</div>
			{weatherToday && (
				<div className="weatherRows">
					<WeatherInfoEl
						icon={'wi wi-owm-' + weatherToday.weatherId}
						text={weatherToday.weatherMain}
						data={undefined}
					/>
					<TemperatureEl
						temperature1={weatherToday.temp.toFixed(0)}
						temperature2={undefined}
					/>
					<TemperatureEl
						temperature1={weatherToday.temp_min.toFixed(0)}
						temperature2={weatherToday.temp_max.toFixed(0)}
					/>
					<WeatherInfoEl
						icon={'wi wi-humidity'}
						data={`${weatherToday.humidity}%`}
						text={'Humidity'}
					/>
					<WeatherInfoEl
						icon={'wi wi-barometer'}
						data={`${weatherToday.pressure} mBar`}
						text={'Pressure'}
					/>
					<WeatherInfoEl
						icon={'wi wi-strong-wind'}
						data={`${weatherToday.windSpeed} km/h`}
						text={'Wind'}
					/>
					<WeatherInfoEl
						icon={'wi wi-sunrise'}
						data={`${getTimeFromDate(weatherToday.sunrise * 1000)} AM`}
						text={'Sunrise'}
					/>
					<WeatherInfoEl
						icon={'wi wi-sunset'}
						data={`${getTimeFromDate(weatherToday.sunset * 1000)} PM`}
						text={'Sunset'}
					/>
					<WeatherInfoEl
						icon={'wi wi-time-12'}
						data={getDatetime(weatherToday.sunset, weatherToday.sunrise)}
						text={'Daytime'}
					/>
				</div>
			)}
			<div className="forecastRow">
				{forecast?.daily.map((day, index) => {
					if (index > 0 && index <= 3)
						return (
							<ForecastInfoEl
								icon={day.weather[0].id}
								day={day.dt * 1000}
								temprMin={day.temp.min.toFixed(0)}
								temprMax={day.temp.max.toFixed(0)}
							/>
						)
					else return ''
				})}
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
