import map from '../assets/map.png'



export default function LocationSelection () {
    return (<div className='location-selection'>
        <img src={map} style={{height:'2rem', width:'2rem'}}></img>
        <div style ={{fontWeight:'bold'}}>Nashville</div>
    </div>)
}