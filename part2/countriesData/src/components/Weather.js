import React from 'react'

import DataPoint from './DataPoint'

const Weather = ({ weatherData }) => {
	if (!weatherData) return <></>
	const { temperature, wind_speed, wind_dir, pressure, cloudcover, humidity, uv_index } = weatherData.current
	return (
		<>
			<h2>Weather in {weatherData.location.name}</h2>
			<DataPoint name="Temperature" data={`${temperature} Celcius`} />
			<DataPoint name="Pressure" data={`${pressure} mm of Mercury`} />
			<DataPoint name="UV Index" data={uv_index} />
			<DataPoint name="Humidity" data={humidity} />
			<DataPoint name="Wind" data={`${wind_speed} mph ${wind_dir}`} />
			<img src={weatherData.current.weather_icons[0]} alt="Cloud Coverage" />
			<DataPoint name="Cloud Cover" data={`${cloudcover}%`} />
		</>
	)
}

export default Weather