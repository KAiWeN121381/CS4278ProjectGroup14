import { FiSearch } from 'react-icons/fi'
import filter from '../assets/filter.png'
import React, {useState} from 'react'
import Filter from './Filter'

export default function SearchBar () {
    const [isOpen, setIsOpen] = useState(false);

    const openFilter = () => {
        setIsOpen(true);
    }

    const closeFilter = () => {
        setIsOpen(false);
    }

    return (<div>
        <input className='input-bar' type='search' placeholder='Search for housing'>
        </input>
        <FiSearch style={{height: '1.5rem', width:'1.5rem'}}/>
        <button className="filter-button" onClick={isOpen ? closeFilter : openFilter}>
            <img src={filter} style={{height: '1.5rem', width:'1.5rem'}}></img>
        </button>
        <Filter isOpen={isOpen} onClose={closeFilter} />
    </div>)
}