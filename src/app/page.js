'use client'

import MapModal from '@/components/MapModal.js'
import { removeUser, saveUser } from '@/utils/functions.js'
import Link from 'next/link.js'
import { useEffect, useState } from 'react'
import LoadMoreButton from '../components/LoadMoreButton.js'
import UserCard from '../components/UserCard.js'
import WeatherModal from '../components/WeatherModal.js'
import { fetchUsers, fetchWeather } from '../utils/api'

const Home = () => {
	const [users, setUsers] = useState([])
	const [weather, setWeather] = useState({})
	const [selectedUser, setSelectedUser] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [showMap, setShowMap] = useState(false)

	useEffect(() => {
		fetchUsers().then(data => setUsers(data))
	}, [])

	const handleLoadMore = async () => {
		const newUsers = await fetchUsers()
		setUsers(prevUsers => [...prevUsers, ...newUsers])
	}

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
			<h1 className='text-2xl font-bold mb-4'>Users List</h1>
			<Link href='/saved'>
				<button className='bg-gray-500 text-white px-4 py-2 mb-4 mr-4'>
					View Saved Users
				</button>
			</Link>
			<LoadMoreButton onClick={handleLoadMore} />
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{users.map((user, index) => (
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

export default Home
