import { useEffect, useState } from 'react'

const UserCard = ({ user, onSave, onDelete, onWeatherClick, onShowMap }) => {
	const [isSaved, setIsSaved] = useState(false)

	useEffect(() => {
		const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || []
		setIsSaved(savedUsers.some(savedUser => savedUser.email === user.email))
	}, [])

	const handleSave = () => {
		onSave(user)
		setIsSaved(true)
	}

	const handleDelete = () => {
		onDelete(user.email)
		setIsSaved(false)
	}

	return (
		<div className='p-4 border rounded-lg shadow'>
			<img
				src={user.picture.medium}
				alt={user.name.first}
				className='rounded-full'
			/>
			<h2 className='text-lg font-bold'>
				{user.name.first} {user.name.last} ({user.gender})
			</h2>
			<p>{user.email}</p>
			<p>
				{user.location.city}, {user.location.country}
			</p>

			{isSaved ? (
				<button
					onClick={handleDelete}
					className='bg-red-500 text-white px-4 py-2 mt-2'
				>
					Delete
				</button>
			) : (
				<button
					onClick={handleSave}
					className='bg-green-500 text-white px-4 py-2 mt-2'
				>
					Save
				</button>
			)}

			<button
				onClick={() => onWeatherClick(user)}
				className='bg-blue-500 text-white px-4 py-2 mt-2 ml-2'
			>
				Weather
			</button>
			<button
				onClick={() => onShowMap(user)}
				className='bg-yellow-500 text-white px-4 py-2 mt-2 ml-2'
			>
				Show on Map
			</button>
		</div>
	)
}

export default UserCard
