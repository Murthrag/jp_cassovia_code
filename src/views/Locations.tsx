import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { DefaultLocations } from '../constants/defaultLocations'
import LocationIcon from '../assets/location-icon.svg'

// styles
import './Locations.scss'
import { APPkey } from '../constants/appDefaults'

interface CityTempObj {
	name: String
	temperature: number
}

// component
const Locations: React.FC = () => {
	const searchInput = useRef<HTMLInputElement>(null)
	const [allLocationWithTemperature, setAllLocationWithTemperature] = useState<
		Array<CityTempObj>
	>(new Array<CityTempObj>())

	const [displayLocations, setDisplayLocations] = useState<Array<CityTempObj>>(
		new Array<CityTempObj>()
	)
	const history = useHistory()

	const inputSearch = () => {
		let searchString = searchInput.current?.value || ''
		setDisplayLocations(
			allLocationWithTemperature.filter((loc) =>
				loc.name.toLocaleUpperCase().includes(searchString.toLocaleUpperCase())
			)
		)
	}

	const inputSelectLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && displayLocations.length === 1)
			history.push('/', displayLocations[0].name)
	}

	useEffect(() => {
		let dataPromises: Array<Promise<void | Response>> = new Array<Promise<Response>>()

		// eslint-disable-next-line array-callback-return
		DefaultLocations.map((city) => {
			dataPromises.push(
				fetch(`https://api.openweathermap.org/data/2.5/weather
				?q=${encodeURI(city.toString())}
				&appid=${APPkey}
				&units=metric`)
					.then((res) => res.json())
					.then((res) => {
						allLocationWithTemperature.push({
							name: city,
							temperature: res.main.temp,
						})
					})
			)
		})
		Promise.all(dataPromises).then(() =>
			setDisplayLocations(
				allLocationWithTemperature.sort((a, b): number =>
					a.name.localeCompare(b.name.toString())
				)
			)
		)
	}, [allLocationWithTemperature])

	return (
		<div className="locationSearchHolder">
			<div className="locationSearch">
				<input
					autoFocus
					placeholder="Search city ..."
					ref={searchInput}
					onChange={inputSearch}
					onKeyPress={(event) => inputSelectLocation(event)}
				/>
				<img src={LocationIcon} alt="Search icon" />
			</div>
			{displayLocations.map((locat) => (
				<div className="cityWithTemperature">
					<Link
						to={{
							pathname: '/',
							state: locat.name,
						}}
					>
						<div className="cityTextAndTemperature">
							{locat.name}
							<p>{locat.temperature ? locat.temperature.toFixed(0) + ' °C' : ''}</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

export default Locations
