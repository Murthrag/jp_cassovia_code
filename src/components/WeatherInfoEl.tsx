import React from 'react'

import './WeatherInfoEl.scss'

export interface IWeatherInfoElProps {
	icon: string
	data: string | undefined
	text: string
}

const WeatherInfoEl: React.FC<IWeatherInfoElProps> = (props) => {
	const w_data = props

	// wi wi-owm-
	return (
		<div className="weatherInfoCard">
			<i className={`${w_data.icon} `}></i>
			<h2>{w_data.data}</h2>
			<h3>{w_data.text}</h3>
		</div>
	)
}

export default WeatherInfoEl
