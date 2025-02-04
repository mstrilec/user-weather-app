import {
	Cloud,
	CloudDrizzle,
	CloudFog,
	CloudLightning,
	CloudRain,
	CloudSnow,
	Snowflake,
	Sun,
} from 'lucide-react'

export const getWeatherIcon = condition => {
	switch (true) {
		case condition === 0:
			return <Sun size={24} />
		case [1, 2, 3].includes(condition):
			return <Cloud size={24} />
		case [45, 48].includes(condition):
			return <CloudFog size={24} />
		case [51, 53, 55].includes(condition):
			return <CloudDrizzle size={24} />
		case [56, 57, 66, 67].includes(condition):
			return <CloudRain size={24} />
		case [61, 63, 65, 80, 81, 82].includes(condition):
			return <CloudRain size={24} />
		case [71, 73, 75, 85, 86].includes(condition):
			return <CloudSnow size={24} />
		case condition === 77:
			return <Snowflake size={24} />
		case [95, 96, 99].includes(condition):
			return <CloudLightning size={24} />
		default:
			return <Sun size={24} />
	}
}

export const saveUser = (user) => {
	const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || []
	localStorage.setItem('savedUsers', JSON.stringify([...savedUsers, user]))
}

export const removeUser = (email) => {
	const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || []
	const updatedUsers = savedUsers.filter(user => user.email !== email)
	localStorage.setItem('savedUsers', JSON.stringify(updatedUsers))
}
