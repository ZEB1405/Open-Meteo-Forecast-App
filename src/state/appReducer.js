export const initialState = {
  searchTerm: '',
  locations: [],
  selectedLocation: null,
  forecastData: null,
  isSearching: false,
  searchError: null,
  isForecastLoading: false,
  forecastError: null,
  isResultsOpen: false,
  hasSearched: false,
}

export function appReducer(state, action) {
  switch (action.type) {
    case 'SEARCH_TERM_CHANGED':
      return {
        ...state,
        searchTerm: action.value,
        searchError: null,
        hasSearched: false,
      }

    case 'SEARCH_INVALID':
      return {
        ...state,
        locations: [],
        selectedLocation: null,
        forecastData: null,
        forecastError: null,
        isResultsOpen: false,
        searchError: action.error,
        hasSearched: true,
      }

    case 'SEARCH_STARTED':
      return {
        ...state,
        locations: [],
        selectedLocation: null,
        forecastData: null,
        forecastError: null,
        isResultsOpen: false,
        isSearching: true,
        searchError: null,
        hasSearched: true,
      }

    case 'SEARCH_SUCCEEDED':
      return {
        ...state,
        locations: action.locations,
        isResultsOpen: action.locations.length > 0,
        isSearching: false,
      }

    case 'SEARCH_FAILED':
      return {
        ...state,
        locations: [],
        isResultsOpen: false,
        isSearching: false,
        searchError: action.error,
      }

    case 'LOCATION_SELECTED':
      return {
        ...state,
        selectedLocation: action.location,
        isResultsOpen: false,
        forecastData: null,
        isForecastLoading: true,
        forecastError: null,
      }

    case 'FORECAST_SUCCEEDED':
      return {
        ...state,
        forecastData: action.forecast,
        isForecastLoading: false,
      }

    case 'FORECAST_FAILED':
      return {
        ...state,
        isForecastLoading: false,
        forecastError: action.error,
      }

    case 'RESULTS_TOGGLED':
      return {
        ...state,
        isResultsOpen: !state.isResultsOpen,
      }

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
