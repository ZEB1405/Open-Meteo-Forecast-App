# Open-Meteo Weather

Open-Meteo Weather is a React app that lets users search for a city and view its current weather and upcoming forecast using the Open-Meteo API.

## Primary Workflow

1. User opens the app.
2. User searches for a city.
3. App displays matching locations.
4. User selects a location.
5. App displays the selected city and country.
6. App fetches weather data.
7. App displays current weather and a seven-day forecast.

Open-Meteo Weather is a responsive React application that lets users search for a city, choose a location, and view its current weather and seven-day forecast.

The project demonstrates practical frontend API consumption with React and JavaScript. It uses Open-Meteo's Geocoding API to find locations and Forecast API to retrieve weather data for the selected coordinates.

## Features

- Search for cities and view matching locations
- Select a location from a collapsible results panel
- Display current temperature, condition, and wind speed
- Display a seven-day forecast
- Translate Open-Meteo weather codes into readable conditions
- Show loading, empty, and error states
- Cancel stale forecast requests when a new location is selected
- Responsive layout for desktop and mobile screens
- Reducer-driven state transitions with focused tests

## User Workflow

1. User searches for a city.
2. App requests matching locations from the Geocoding API.
3. User selects a location.
4. App requests weather data using the location coordinates.
5. App displays current conditions and the seven-day forecast.

## Tech Stack

- React
- JavaScript
- Vite
- CSS Modules
- Browser Fetch API
- Vitest
- Open-Meteo APIs

## Getting Started

### Requirements

- Node.js
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Validation

```bash
npm test
npm run lint
npm run build
npm audit
```

## API Usage

This project uses:

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for city search
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs) for current and daily weather data

The app does not require an API key for this non-commercial project. See [Open-Meteo's terms](https://open-meteo.com/en/terms) for usage details.

## Project Structure

```text
src/
	components/       UI components and CSS Modules
	services/         Open-Meteo API requests
	state/            Reducer and reducer tests
	utils/            Weather-code mapping helpers
	App.jsx           Application composition and async event handlers
```

The main responsibilities are separated as follows:

- `App` coordinates application state and API requests.
- Components render focused parts of the interface.
- Services handle external API communication.
- Utilities transform API values into user-facing descriptions.
- The reducer makes search, forecast, and dropdown transitions explicit.

## MVP Checklist

- [x] User can enter and submit a city search
- [x] App displays matching locations
- [x] User can select a location
- [x] App displays the selected city and country
- [x] App displays the current temperature
- [x] App displays the weather condition
- [x] App displays the wind speed
- [x] App displays a seven-day forecast
- [x] App shows a loading state while data is being fetched
- [x] App shows an error state when the API request fails
- [x] App shows a no-results state for unknown locations
- [x] App works on mobile and desktop

## Future Features

- [ ] Add browser geolocation
- [ ] Add favorite locations
- [ ] Add recent searches
- [ ] Add Celsius/Fahrenheit switching
- [ ] Add hourly forecast
- [ ] Add weather icons
- [ ] Add weather charts
- [ ] Add dark mode
- [ ] Add component and API integration tests
- [ ] Add TypeScript
- [ ] Add an ASP.NET Core backend

## Current Limitations

- Weather data depends on the availability of the external Open-Meteo APIs.
- The app currently displays metric units only.
- The project is a frontend API client and does not include a custom backend.
