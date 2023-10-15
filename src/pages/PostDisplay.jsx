import Lhouse from '../assets/defaulthouse.png'
import MapComponent from "../components/MapComponent";

export default function PostDisplay(props) {
    return (
        <div>
            <div className="left_right_separator">
                <div className="post-left">
                    <div>
                        <h1>Post title</h1>
                        <img
                            src={Lhouse}
                            alt="Temp photo">
                        </img>
                    </div>      
                </div>
                <div className="post-right">
                    <div>
                        <h1>Property details</h1>
                        <p>Price: {props.price}/Month</p>
                        <p>Duration: {props.start}-{props.end}</p>
                        <p>Distance to campus: {props.distance}Mi</p>
                        <p>Facilities: </p>
                        <p>Location:</p>
                        <MapComponent/>
                    </div>
                </div>
            </div>
        </div>)
}