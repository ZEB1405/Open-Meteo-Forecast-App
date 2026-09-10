import ForecastCard from "./ForecastCard";
import styles from "./ForecastList.module.css";

function ForecastList({ forecast }) {
    return (
        <section className={styles.forecast}>
            <h2>Seven-day forecast</h2>

            <div className={styles.cards}>
                {forecast.map(day => (
                    <ForecastCard
                        key={day.day}
                        day={day}
                    />
                ))}
            </div>
        </section>
    );
}

export default ForecastList;
