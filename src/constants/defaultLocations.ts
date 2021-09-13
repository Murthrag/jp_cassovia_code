export const DefaultLocations: String[] = [
	'Bratislava',
	'Humenné',
	'Koromľa',
	'Košice',
	'Michalovce',
	'Sobrance',
]

export const LocationLatLon: 
Map<String, {lat:number,lon:number}> =
new Map([
	["Bratislava", {lat: 48.15, lon: 17.11}],
	["Humenné", {lat: 48.94, lon: 21.91}],
	["Koromľa", {lat: 48.71, lon: 22.29}],
	["Košice", {lat: 48.72, lon: 21.26}],
	["Michalovce", {lat: 48.76, lon: 21.91}],
	["Sobrance", {lat: 48.75, lon: 22.18}]
])
