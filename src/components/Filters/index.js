const Filters = ({setFilters, filters}) => {

    const handleChange = e => {
        setFilters({ ...filters, searchString: e.target.value,})
    }

    return ( 
        <div>
            <input 
                type="text"
                className="border h-9 w-80 outline-none mb-4" 
                value={filters.searchString}
                onChange={handleChange} />
        </div>
     );
}
 
export default Filters;