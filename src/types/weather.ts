export interface WeatherTodayResponse {
	dt: number
	clouds: {
		all: number
	}
	main: {
		feels_like: number
		humidity: number
		pressure: number
		temp: number
		temp_max: number
		temp_min: number
	}
	name: string
	sys: {
		sunrise: number
		sunset: number
	}
	weather: Array<{
		id: number
		description: string
		icon: string
		main: string
	}>
	wind: {
		speed: number
		deg: number
	}
}

export interface WeatherToday {
	dt: number
	description: string
	clouds: number
	feels_like: number
	humidity: number
	pressure: number
	temp: number
	temp_max: number
	temp_min: number
	cityName: string
	sunrise: number
	sunset: number
	weatherId: number
	weatherIcon: string
	weatherMain: string
	windSpeed: number
	windDeg: number
}

export interface Forecast {
	hourly: Array<{
		dt: number
		temp: number
		weather: Array<{ id: number; description: string }>
	}>
	daily: Array<{
		dt: number
		temp: { min: number; max: number }
		weather: Array<{ id: number; description: string }>
	}>
}
