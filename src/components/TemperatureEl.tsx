import React from 'react'

import './TemperatureEl.scss'

export interface ITemperatureEl {
	tempMin: string
	tempMax: string | undefined
}

const TemperatureEl: React.FC<ITemperatureEl> = (props) => {
	return props.tempMax ? (
		<div className="tempInfo">
			<h5>{props.tempMin} °C <i className="wi wi-direction-down"></i></h5>
			<h5>{props.tempMax} °C <i className="wi wi-direction-up"></i></h5>
		</div>
	) : (
		<div className="tempInfo">
			<h2>{props.tempMin} °C</h2>
		</div>
	)
}

export default TemperatureEl
