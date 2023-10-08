import { FiSearch } from 'react-icons/fi'
import filter from '../assets/filter.png'

export default function SearchBar () {
    return (<div>
        <input className='input-bar' type='search' placeholder='Search for housing'>
        </input>
        <FiSearch style={{height: '1.5rem', width:'1.5rem'}}/>
        <img src={filter} style={{height: '1.5rem', width:'1.5rem'}}></img>
    </div>)
}