import React from 'react'

import './ForecastInfoEl.scss'

export interface IForecastInfoEl {
	icon: number
	day: number
	temprMin: string
	temprMax: string
}

const ForecastInfoEl: React.FC<IForecastInfoEl> = (props) => {
	const forecast_data = props

	const getDayName = (dt: number): string => {
		let date = new Date(dt)
		return date.toLocaleDateString('en-US', { weekday: 'short' })
	}

	return (
		<div className="forecastInfoCard">
			<div className="forecastBox">
				<i className={`wi wi-owm-${forecast_data.icon} `}></i>
				<h2>{getDayName(forecast_data.day ? forecast_data.day : 0)}</h2>
				<h3>
					{`${forecast_data.temprMin} °C `}
					<i className="wi wi-direction-down"></i>&nbsp;
					{` ${forecast_data.temprMax} °C `}
					<i className="wi wi-direction-up"></i>
				</h3>
			</div>
		</div>
	)
}

export default ForecastInfoEl
