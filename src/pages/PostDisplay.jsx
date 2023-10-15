import Lhouse from '../assets/defaulthouse.png'
import MapComponent from "../components/MapComponent";
import info from '../assets/info.png'

export default function PostDisplay(props) {
    return (
        <div>
            <div className="left_right_separator">
                <div className="post-left">
                    <div className="post-image">
                        <h1>Post title</h1>
                        <img
                            src={Lhouse}>
                        </img>
                    </div>      
                </div>
                <div className="post-right">
                    <div style={{display:'flex'}}>
                        <h1>Property details</h1>
                        <img src={info} style={{width:'2.5rem', height:'2.5rem'}}/>
                    </div>
                    <div className="post-details">
                        <div className="post-details-text">
                            <div className="post-detail-inline">
                                <h5>Price: </h5> 
                                <h5> {props.price} / Month</h5>
                            </div>
                            <div className="post-detail-inline">
                                <h5>Duration: </h5> 
                                <h5> {props.start} - {props.end}</h5>
                            </div>
                            <div className="post-detail-inline">
                                <h5>Distance to campus: </h5>
                                <h5> {props.distance} Mi</h5>
                            </div>
                            <div>
                                <h5>Facilities: </h5>
                            </div>
                            <h5>Location: </h5>
                            <MapComponent/>
                        </div>
                        <div className='post-details-wrapper'>
                            <button className='request-sublet-button'>Request Sublet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}