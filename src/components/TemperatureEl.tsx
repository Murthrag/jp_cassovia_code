import React from 'react'

import './TemperatureEl.scss'

export interface ITemperatureEl {
	temperature1: string
	temperature2: string | undefined
}

const TemperatureEl: React.FC<ITemperatureEl> = (props) => {
	return props.temperature2 ? (
		<div className="tempInfo">
			<h5>{props.temperature1} °C</h5>
			<h5>{props.temperature2} °C</h5>
		</div>
	) : (
		<div className="tempInfo">
			<h2>{props.temperature1} °C</h2>
		</div>
	)
}

export default TemperatureEl
