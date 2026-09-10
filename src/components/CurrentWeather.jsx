import styles from './CurrentWeather.module.css'

function CurrentWeather({ weatherData }) {
    return (
        <section className={styles.card}>
            <h2>
                {weatherData.city}, {weatherData.country}
            </h2>

            <p>{weatherData.temperature}°C</p>
            <p>{weatherData.condition}</p>
            <p>Wind: {weatherData.windSpeed} km/h</p>
        </section>
    )
}

export default CurrentWeather