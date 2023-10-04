import { FiSearch } from 'react-icons/fi'

export default function SearchBar () {
    return (<div>
        <input className='input-bar' type='search' placeholder='Search for housing'>
        </input>

        {/* Search icon */}
        <FiSearch />
    </div>)
}