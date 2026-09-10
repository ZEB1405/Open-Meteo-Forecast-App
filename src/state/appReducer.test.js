import { describe, expect, it } from "vitest";
import { appReducer, initialState } from "./appReducer";

describe("appReducer", () => {
    it("changes the search term and resets search feedback", () => {
        const previousState = {
            ...initialState,
            searchError: new Error("Previous search failed"),
            hasSearched: true
        };

        const state = appReducer(previousState, {
            type: "SEARCH_TERM_CHANGED",
            value: "Bergen"
        });

        expect(state.searchTerm).toBe("Bergen");
        expect(state.searchError).toBeNull();
        expect(state.hasSearched).toBe(false);
    });

    it("stores an invalid-search error and clears weather data", () => {
        const error = new Error("Please enter a location to search.");
        const previousState = {
            ...initialState,
            locations: [{ id: 1 }],
            selectedLocation: { id: 1 },
            forecastData: { current: {} },
            isResultsOpen: true
        };

        const state = appReducer(previousState, {
            type: "SEARCH_INVALID",
            error
        });

        expect(state.locations).toEqual([]);
        expect(state.selectedLocation).toBeNull();
        expect(state.forecastData).toBeNull();
        expect(state.isResultsOpen).toBe(false);
        expect(state.searchError).toBe(error);
        expect(state.hasSearched).toBe(true);
    });

    it("starts a search with clean search state", () => {
        const state = appReducer(initialState, { type: "SEARCH_STARTED" });

        expect(state.isSearching).toBe(true);
        expect(state.searchError).toBeNull();
        expect(state.locations).toEqual([]);
        expect(state.hasSearched).toBe(true);
    });

    it("stores search results and opens the results panel", () => {
        const locations = [
            { id: 1, name: "Bergen", country: "Norway" },
            { id: 2, name: "Bergen auf Rügen", country: "Germany" }
        ];

        const state = appReducer(initialState, {
            type: "SEARCH_SUCCEEDED",
            locations
        });

        expect(state.locations).toEqual(locations);
        expect(state.isResultsOpen).toBe(true);
        expect(state.isSearching).toBe(false);
    });

    it("keeps the results panel closed when a search returns no locations", () => {
        const state = appReducer(initialState, {
            type: "SEARCH_SUCCEEDED",
            locations: []
        });

        expect(state.locations).toEqual([]);
        expect(state.isResultsOpen).toBe(false);
        expect(state.isSearching).toBe(false);
    });

    it("stores a search error and closes the results panel", () => {
        const error = new Error("Search request failed");
        const previousState = {
            ...initialState,
            locations: [{ id: 1 }],
            isResultsOpen: true,
            isSearching: true
        };

        const state = appReducer(previousState, {
            type: "SEARCH_FAILED",
            error
        });

        expect(state.locations).toEqual([]);
        expect(state.isResultsOpen).toBe(false);
        expect(state.isSearching).toBe(false);
        expect(state.searchError).toBe(error);
    });

    it("selects a location and starts loading its forecast", () => {
        const location = {
            id: 1,
            name: "Bergen",
            country: "Norway",
            latitude: 60.39,
            longitude: 5.32
        };
        const previousState = {
            ...initialState,
            isResultsOpen: true,
            forecastData: { current: {} },
            forecastError: new Error("Previous forecast failed")
        };

        const state = appReducer(previousState, {
            type: "LOCATION_SELECTED",
            location
        });

        expect(state.selectedLocation).toEqual(location);
        expect(state.isResultsOpen).toBe(false);
        expect(state.forecastData).toBeNull();
        expect(state.isForecastLoading).toBe(true);
        expect(state.forecastError).toBeNull();
    });

    it("stores a successful forecast and stops loading", () => {
        const forecast = {
            current: { temperature_2m: 14 },
            daily: { time: ["2026-09-10"] }
        };

        const state = appReducer(
            { ...initialState, isForecastLoading: true },
            { type: "FORECAST_SUCCEEDED", forecast }
        );

        expect(state.forecastData).toEqual(forecast);
        expect(state.isForecastLoading).toBe(false);
    });

    it("stores a forecast error and stops loading", () => {
        const error = new Error("Forecast request failed");

        const state = appReducer(
            { ...initialState, isForecastLoading: true },
            { type: "FORECAST_FAILED", error }
        );

        expect(state.isForecastLoading).toBe(false);
        expect(state.forecastError).toBe(error);
    });

    it("toggles the results panel", () => {
        const openState = appReducer(initialState, { type: "RESULTS_TOGGLED" });
        const closedState = appReducer(openState, { type: "RESULTS_TOGGLED" });

        expect(openState.isResultsOpen).toBe(true);
        expect(closedState.isResultsOpen).toBe(false);
    });

    it("throws for an unknown action", () => {
        expect(() => appReducer(initialState, { type: "UNKNOWN_ACTION" })).toThrow(
            "Unknown action type: UNKNOWN_ACTION"
        );
    });
});
