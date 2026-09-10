const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchLocations(searchTerm) {
    const params = new URLSearchParams({
        name: searchTerm,
        count: 5,
        language: 'en',
        format: 'json'
    });

    const response = await fetch(`${GEOCODING_API_URL}?${params}`);

    if(!response.ok) {
        throw new Error(`Unable to search locations: ${response.status}`);
    }

    const data = await response.json();

    return data.results ?? [];
}

export async function getForecast(latitude, longitude, signal) {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: 7
    })

    const response = await fetch(`${FORECAST_API_URL}?${params}`, { signal });

    if (!response.ok) {
        throw new Error('Unable to load forecast data');
    }
    return response.json();
}