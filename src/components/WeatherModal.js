import { getWeatherIcon } from '@/utils/functions'

const WeatherModal = ({ city, weather, onClose }) => {
	return (
		<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
			<div className='bg-white p-6 rounded shadow-lg w-full max-w-lg'>
				<h2 className='text-lg font-bold'>Weather in {city}</h2>
				<p className='flex gap-2'>
					Temperature: {weather.current_weather.temperature}°C{' '}
					<span>{getWeatherIcon(weather.current_weather.weathercode)}</span>
				</p>
				<p>
					Min: {Math.min(...weather.hourly.temperature_2m)}°C | Max:{' '}
					{Math.max(...weather.hourly.temperature_2m)}°C
				</p>

				<h3 className='text-md font-bold mt-4'>Hourly Forecast</h3>
				<div className='grid grid-cols-3 gap-2 text-center'>
					{weather.hourly.temperature_2m.slice(0, 24).map((temp, index) => (
						<div key={index} className='border p-2 rounded'>
							{weather.hourly.time[index].slice(11, 16)} - {temp}°C
						</div>
					))}
				</div>

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

export default WeatherModal
