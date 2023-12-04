import {React, useState} from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import {setKey, fromAddress} from "react-geocode";

// The map API
// TO-DO: Add input for changing the map location
function MapComponent (props){
    const [pin, setPin] = useState({
      lat: 0,
      lng: 0,
    })
    const [center, setCenter] = useState({
      lat: 36.144051,
      lng: -86.800949,
    })
    const [needReload, setNeedReload] = useState(true);

    // Styling for the map
    const mapContainerStyle = {
      width: "90%",
      height: "150%",
    };

    setKey("AIzaSyDTATygXtfchazffh0LK_7vZ9Bah5LDVfI");

    if (props.address && needReload) {
      fromAddress(props.address)
      .then(({ results}) => {
        setPin(results[0].geometry.location);
        setCenter(results[0].geometry.location);
        setNeedReload(false);
        console.log(pin);
      }).catch(console.error);
    }

    return (
      <LoadScript googleMapsApiKey="AIzaSyDTATygXtfchazffh0LK_7vZ9Bah5LDVfI">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
        >
          <MarkerF position={pin} />
        </GoogleMap>
      </LoadScript>
    );
}

export default MapComponent;
