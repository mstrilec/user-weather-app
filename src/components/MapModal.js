'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const MapContainer = dynamic(
	() => import('react-leaflet').then(mod => mod.MapContainer),
	{ ssr: false }
)
const TileLayer = dynamic(
	() => import('react-leaflet').then(mod => mod.TileLayer),
	{ ssr: false }
)
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
	ssr: false,
})
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
	ssr: false,
})

const MapModal = ({ user, onClose }) => {
	const { latitude, longitude } = user.location.coordinates
	const [userIcon, setUserIcon] = useState(null)

	useEffect(() => {
		import('leaflet').then(L => {
			setUserIcon(
				L.divIcon({
					html: `<img src="${user.picture.medium}" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid white;"/>`,
					className: 'custom-user-icon',
					iconSize: [50, 50],
					iconAnchor: [25, 25],
					popupAnchor: [0, -30],
				})
			)
		})
	}, [user.picture.medium])

	return (
		<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white p-6 rounded shadow-lg w-full max-w-lg'>
				<h2 className='text-lg font-bold'>{user.name.first}&apos;s Location</h2>
				<MapContainer
					center={[latitude, longitude]}
					zoom={10}
					className='h-64 w-full mt-2 rounded-lg'
				>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
					{userIcon && (
						<Marker position={[latitude, longitude]} icon={userIcon}>
							<Popup>
								{user.location.city}, {user.location.country}
							</Popup>
						</Marker>
					)}
				</MapContainer>
				<button
					onClick={onClose}
					className='bg-red-500 text-white px-4 py-2 mt-4'
				>
					Close
				</button>
			</div>
		</div>
	)
}

export default MapModal
