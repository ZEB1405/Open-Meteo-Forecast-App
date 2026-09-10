import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import { useEffect, useReducer, useRef } from "react";
import { getForecast, searchLocations } from "./services/openMeteo";
import { getWeatherDescription } from "./utils/weatherCodes";
import StatusMessage from "./components/StatusMessage";
import { appReducer, initialState } from "./state/appReducer";

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const forecastRequestRef = useRef(null);
    const {
        searchTerm,
        locations,
        selectedLocation,
        forecastData,
        isSearching,
        searchError,
        isForecastLoading,
        forecastError,
        isResultsOpen,
        hasSearched
    } = state;

    useEffect(() => {
        return () => forecastRequestRef.current?.abort();
    }, []);

    const forecast = forecastData
        ? forecastData.daily.time.map((date, index) => ({
              day: date,
              high: forecastData.daily.temperature_2m_max[index],
              low: forecastData.daily.temperature_2m_min[index],
              condition: getWeatherDescription(forecastData.daily.weather_code[index])
          }))
        : [];

    async function handleSearch(e) {
        e.preventDefault();

        const trimmedSearchTerm = searchTerm.trim();
        if (!trimmedSearchTerm) {
            dispatch({
                type: "SEARCH_INVALID",
                error: new Error("Please enter a location to search.")
            });
            return;
        }

        dispatch({ type: "SEARCH_STARTED" });

        try {
            const results = await searchLocations(trimmedSearchTerm);
            dispatch({ type: "SEARCH_SUCCEEDED", locations: results });
        } catch (error) {
            console.error("Error searching locations:", error);
            dispatch({ type: "SEARCH_FAILED", error });
        }
    }

    function handleSearchTermChange(value) {
        dispatch({ type: "SEARCH_TERM_CHANGED", value });
    }

    async function handleLocationSelect(location) {
        forecastRequestRef.current?.abort();
        const controller = new AbortController();
        forecastRequestRef.current = controller;

        dispatch({ type: "LOCATION_SELECTED", location });

        try {
            const forecast = await getForecast(location.latitude, location.longitude, controller.signal);
            dispatch({ type: "FORECAST_SUCCEEDED", forecast });
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }

            console.error("Error loading forecast:", error);
            dispatch({ type: "FORECAST_FAILED", error });
        } finally {
            if (forecastRequestRef.current === controller) {
                forecastRequestRef.current = null;
            }
        }
    }

    const currentWeather = forecastData
        ? {
              city: selectedLocation.name,
              country: selectedLocation.country,
              temperature: forecastData.current.temperature_2m,
              condition: getWeatherDescription(forecastData.current.weather_code),
              windSpeed: forecastData.current.wind_speed_10m
          }
        : null;

    return (
        <main className="app-shell">
            <header className="app-header">
                <p className="eyebrow">Open-Meteo</p>
                <h1>Weather, at a glance.</h1>
                <p className="intro">Search for a location to see its forecast.</p>
            </header>

            <SearchForm
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onSubmit={handleSearch}
                isSearching={isSearching}
            />

            {isSearching && <StatusMessage message="Searching locations..." />}

            {searchError && (
                <StatusMessage
                    message="Could not search locations. Please try again."
                    role="alert"
                />
            )}

            {isForecastLoading && <StatusMessage message="Loading forecast..." />}

            {forecastError && (
                <StatusMessage
                    message="Could not load the forecast. Please try again."
                    role="alert"
                />
            )}

            {hasSearched && !isSearching && !searchError && searchTerm && locations.length === 0 && (
                <StatusMessage message={`No results found for "${searchTerm}".`} />
            )}

            {locations.length > 0 && (
                <SearchResults
                    locations={locations}
                    selectedLocation={selectedLocation}
                    isOpen={isResultsOpen}
                    onToggle={() => dispatch({ type: "RESULTS_TOGGLED" })}
                    onLocationSelect={handleLocationSelect}
                />
            )}

            {currentWeather && <CurrentWeather weatherData={currentWeather} />}

            {forecastData && <ForecastList forecast={forecast} />}
        </main>
    );
}

export default App;
