import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

class MapComponent extends Component {
  render() {
    const mapContainerStyle = {
      width: '50%',
      height: '400px',
    };

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
          {/* Add any additional components or markers here */}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default MapComponent;
