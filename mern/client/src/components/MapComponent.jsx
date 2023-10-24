import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// The map API
// TO-DO: Add input for changing the map location
class MapComponent extends Component {
  render() {
    // Styling for the map
    const mapContainerStyle = {
      width: '90%',
      height: '150%',
    };

    // Value for where the default location of the map should be
    const center = {
      lat: 36.144051,
      lng: -86.800949,
    };

    return (
      <LoadScript googleMapsApiKey="AIzaSyDTATygXtfchazffh0LK_7vZ9Bah5LDVfI">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
        >
          {'Google map to see the location.'}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapComponent;
