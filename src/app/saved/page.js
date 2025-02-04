'use client'

import MapModal from '@/components/MapModal'
import UserCard from '@/components/UserCard'
import WeatherModal from '@/components/WeatherModal'
import { fetchWeather } from '@/utils/api'
import { removeUser, saveUser } from '@/utils/functions'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SavedUsersPage = () => {
	const [savedUsers, setSavedUsers] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)
	const [weather, setWeather] = useState({})
	const [showModal, setShowModal] = useState(false)
	const [showMap, setShowMap] = useState(false)

	useEffect(() => {
		const users = JSON.parse(localStorage.getItem('savedUsers')) || []
		setSavedUsers(users)
	}, [])

	const handleWeatherClick = async user => {
		setSelectedUser(user)
		const weatherData = await fetchWeather(
			user.location.coordinates.latitude,
			user.location.coordinates.longitude
		)
		setWeather(weatherData)
		setShowModal(true)
	}

	const handleShowMap = user => {
		setSelectedUser(user)
		setShowMap(true)
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Saved Users</h1>
			<Link href='/'>
				<button className='bg-gray-500 text-white px-4 py-2 mb-4'>
					Go back
				</button>
			</Link>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{savedUsers.map((user, index) => (
					<UserCard
						key={index}
						user={user}
						onSave={saveUser}
						onDelete={removeUser}
						onWeatherClick={handleWeatherClick}
						onShowMap={handleShowMap}
					/>
				))}
			</div>
			{showModal && selectedUser && (
				<WeatherModal
					city={selectedUser.location.city}
					weather={weather}
					onClose={() => setShowModal(false)}
				/>
			)}

			{showMap && selectedUser && (
				<MapModal user={selectedUser} onClose={() => setShowMap(false)} />
			)}
		</div>
	)
}

export default SavedUsersPage
