const categories = ['all', 'Tech', 'Finance', 'Marketing', 'Healthcare']

function FilterBar({ activeCategory, searchQuery, onCategoryChange, onSearchChange }) {
    return (
        <div className="jobs-filter">
            <input
                type="text"
                placeholder="Filter jobs by title or company..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className="filter-buttons">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => onCategoryChange(category)}
                    >
                        {category === 'all' ? 'All' : category}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FilterBar