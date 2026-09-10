import styles from "./SearchResults.module.css";

function SearchResults({ locations, selectedLocation, onLocationSelect, isOpen, onToggle }) {
    return (
        <section className={styles.results}>
            <button
                type="button"
                className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`}
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span>
                    {selectedLocation ? `Selected: ${selectedLocation.name}, ${selectedLocation.country}` : "Select a location"}
                </span>
                <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <>
                    <h2 className={styles.heading}>Choose a location</h2>
                    <ul className={styles.list}>
                        {locations.map(location => (
                            <li key={location.id}>
                                <button
                                    type="button"
                                    className={styles.resultButton}
                                    onClick={() => onLocationSelect(location)}
                                >
                                    {location.name}, {location.country}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
}

export default SearchResults;
