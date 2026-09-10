function SearchForm({ searchTerm, onSearchTermChange, onSubmit, isSearching }) {
    return (
        <form
            className="search-form"
            onSubmit={onSubmit}
        >
            <label htmlFor="location">Location</label>
            <div className="search-row">
                <input
                    id="location"
                    name="location"
                    type="search"
                    placeholder="Search a city"
                    value={searchTerm}
                    onChange={event => onSearchTermChange(event.target.value)}
                />
                <button
                    type="submit"
                    disabled={isSearching}
                >
                    {isSearching ? "Searching..." : "Search"}
                </button>
            </div>
        </form>
    );
}
export default SearchForm;
