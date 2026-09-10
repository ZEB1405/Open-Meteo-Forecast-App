import styles from "./ForecastCard.module.css";

function ForecastCard({ day }) {
    return (
        <article className={styles.card}>
            <h3>
                {new Date(`${day.day}T00:00:00`).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
            </h3>
            <p>{day.condition}</p>
            <p>
                High: {day.high}°C / Low: {day.low}°C
            </p>
        </article>
    );
}

export default ForecastCard;
