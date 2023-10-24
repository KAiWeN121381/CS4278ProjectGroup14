import { FiSearch } from 'react-icons/fi'
import filter from '../assets/filter.png'
import React, {useState} from 'react'
import Filter from './Filter'

// The Search Bar component
// TO-DO: Apply the search results to the post display
export default function SearchBar () {
    const [isOpen, setIsOpen] = useState(false); // boolean for displaying the filter pop-up
    const [searchInfo, setSearchInfo] = useState(""); // variable for storing search keywords

    const openFilter = () => {
        setIsOpen(true);
    }

    const closeFilter = () => {
        setIsOpen(false);
    }

    const handleChange = (e) => {
        let searchText = e.target;
        setSearchInfo((prev) => {
            return {...prev, searchText}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Apply search here
    }

    return (<div>
        <input className='input-bar' type='search' placeholder='Search for housing' onChange={handleChange} />
        <button onClick={handleSubmit} className='filter-button'>
            <FiSearch style={{height: '1.5rem', width:'1.5rem'}}/>
        </button>
        <button className="filter-button" onClick={isOpen ? closeFilter : openFilter}>
            <img src={filter} style={{height: '1.5rem', width:'1.5rem'}}></img>
        </button>
        <Filter isOpen={isOpen} onClose={closeFilter} />
    </div>)
}