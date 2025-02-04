import axios from 'axios'

export const fetchUsers = async () => {
	const res = await axios.get('https://randomuser.me/api/?results=5')
	return res.data.results
}

export const fetchWeather = async (lat, lon) => {
	const res = await axios.get(
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m`
	)
	return res.data
}
