import PostPreview from "./PostPreview";
import LocationSelection from "./LocationSelection";
import React, { useEffect, useState } from "react";
import { FiSearch } from 'react-icons/fi'
import filter from '../assets/filter.png'
import pricetag from "../assets/price-tag.png"
import calendar from "../assets/calendar.png"

// The component for displaying a preview of posts
// TO-DO: Get search and filter results
export default function PostGroup() {
    const [isOpen, setIsOpen] = useState(false); // boolean for displaying the filter pop-up
    const [lastInput, setLastInput] = useState("minPrice");
    const [records, setRecords] = useState([]);
    const [fRecords, setFRecords] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        start: "",
        end: "",
        pet: false,
        gym: false,
        kitchen: false,

    });

    // This method fetches the records from the database.
    useEffect(() => {
    async function getRecords() {
        const response = await fetch(`http://172.31.23.255:5050/posts/`);

        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }

        const records = await response.json();
        setRecords(records);
    }

    getRecords();

    return;
    }, [records.length]);

    let posts = filtered ? fRecords : records;

    return ( 
        <div>
            <div className="search-area">
                    <LocationSelection />
                    <SearchBar key="SearchBar"/>
                </div>
            <div className="grid-container">
                {/* If records are empty, display empty message */}
                {posts.length === 0 && <h1>No posts are found</h1>}

                {/* Dynamically display a post card for each of the posts in the database */}
                {posts.map((post) => (
                    <div className="grid-item">
                        <PostPreview post={post}/>
                    </div>
                ))}
            </div>
        </div>
    )

    function undoSearch() {
        setFiltered(false);
    }

    // Search functionality
    function searchRecords(searchKeyword) {
        if (searchKeyword != "") {
            searchKeyword = searchKeyword.toLowerCase();
            const newRecords = records.filter((record) => (record.title.toLowerCase().indexOf(searchKeyword) !== -1) || (record.description.toLowerCase().indexOf(searchKeyword) !== -1));
            setFRecords(newRecords);
            setFiltered(true);
        }
        else {
            undoSearch();
        }
    }

    function SearchBar () {
        const [searchInfo, setSearchInfo] = useState(""); // variable for storing search keywords
    
        const openFilter = () => {
            setIsOpen(true);
        }
    
        const closeFilter = () => {
            setIsOpen(false);
        }
    
        const handleChange = (e) => {
            let searchText = e.target.value;
            setSearchInfo(searchText);
        }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            searchRecords(searchInfo);
        }
    
        return (<div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input className='input-bar' type='search' placeholder='Search for housing' onChange={handleChange} />
                <button type="submit" className='filter-button'>
                    <FiSearch style={{height: '1.5rem', width:'1.5rem'}}/>
                </button>
            </form>
            <button className="filter-button" onClick={isOpen ? closeFilter : openFilter}>
                    <img src={filter} style={{height: '1.5rem', width:'1.5rem'}}></img>
                </button>
            <Filter isOpen={isOpen} onClose={closeFilter} key="Unique filter" />
            {filtered && <button onClick={undoSearch} className="cancel-button">X</button>}
        </div>)
    }

    function dateIsGreater(d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        return date1 >= date2;
    }

    // Filter functionality
    function filterPosts() {
        let tempRecords = records;
        if(filters.maxPrice !== "") {
            tempRecords = tempRecords.filter((record) => Number(record.price) <= Number(filters.maxPrice))
            console.log("MaxPrice", tempRecords)
        }
        
        if(filters.minPrice !== "") {
            tempRecords = tempRecords.filter((record) => Number(record.price) >= Number(filters.minPrice))
            console.log("MixPrice", tempRecords)
        }
        
        if(filters.start !== "") {
            tempRecords = tempRecords.filter((record) => dateIsGreater(filters.start, record.start))
            console.log("Start", tempRecords)
        }
        
        if(filters.end !== "") {
            tempRecords = tempRecords.filter((record) => dateIsGreater(record.end, filters.end))
            console.log("End", tempRecords)
        }
        
        setFRecords(tempRecords);
        setFiltered(true);
        console.log("Filter results" , fRecords)
    }

    function Filter({ isOpen, onClose}) {
        if (!isOpen) return null; // Do not show if pop-up should not be open

        const updateFilter = (e) => {
            setFilters({...filters, [e.target.name]: e.target.value});
            setLastInput(e.target.name);
        }

        const onSubmit = (e) => {
            e.preventDefault();
            filterPosts();

            onClose();
        }
    
        return  (
            <div className="filter">
                <form className="filter-content" onSubmit={onSubmit}>
                    {/* The close button */}
                    <button onClick={onClose}
                    className="cancel-button"
                    style={{paddingLeft:"99%"}}>
                        X</button>
                    {/* Price range input */}
                    <div className="filter-content-price">
                        <p>Price Range:</p>
                        <div>
                            <div className="filter-content-inline">
                                <p>Minimum: </p><img src={pricetag}/>
                                <input 
                                    autoFocus={lastInput === "minPrice" ? true : false}
                                    key="minPrice"
                                    type="text" 
                                    id="minPrice" 
                                    name="minPrice" 
                                    autoComplete="off"
                                    value={filters.minPrice}
                                    onChange={updateFilter}
                                    onBlur={e => {
                                        if (e.relatedTarget === null) {
                                            e.target.focus();
                                        }
                                    }}/>
                            </div>
                            <div className="filter-content-inline">
                                <p>Maximum: </p><img src={pricetag}/>
                                <input 
                                    autoFocus={lastInput === "maxPrice" ? true : false}
                                    key="maxPrice"  
                                    type="text" 
                                    id="maxPrice" 
                                    name="maxPrice" 
                                    autoComplete="off"
                                    value={filters.maxPrice}
                                    onChange={updateFilter}
                                    onBlur={e => {
                                        if (e.relatedTarget === null) {
                                            e.target.focus();
                                        }
                                    }}/>
                            </div>
                        </div>
                    </div>
                    {/* Facility selection */}
                    <div className="filter-content-facilities">
                        <p>Facilities:</p>
                    </div>
                    {/* Stay duration input */}
                    <div className="filter-content-duration">
                        <p>Intended Duration:</p>
                        <div>
                            <div className="filter-content-inline">
                                <p>Check-in: </p><img src={calendar} style={{height:"4vh"}}/>
                                <input 
                                    autoFocus={lastInput === "start" ? true : false}
                                    key="start"
                                    type="date" 
                                    id="start" 
                                    name="start" 
                                    value={filters.start}
                                    onChange={updateFilter}
                                    onBlur={e => {
                                        if (e.relatedTarget === null) {
                                            e.target.focus();
                                        }
                                    }}/>
                            </div>
                            <div className="filter-content-inline">
                                <p>Check-out: </p><img src={calendar} style={{height:"4vh"}}/>
                                <input 
                                    autoFocus={lastInput === "end" ? true : false}
                                    key="end"
                                    type="date" 
                                    id="end" 
                                    name="end" 
                                    value={filters.end}
                                    onChange={updateFilter}
                                    onBlur={e => {
                                        if (e.relatedTarget === null) {
                                            e.target.focus();
                                        }
                                    }}/>
                            </div>
                        </div>
                    </div>
                    {/* The apply button */}
                    <button type="submit" className="apply-filter-button">Apply</button>
                </form>
            </div>
        )
    }
}

