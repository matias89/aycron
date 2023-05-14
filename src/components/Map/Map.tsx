import { GoogleMap, Marker } from '@react-google-maps/api';

import { StyledItemList, StyledNearLocation, StyledCurrentLocation } from './Map.styles';

const MapComponent = ({ isLoaded, address, center }) => {
    return (
        <div>
            {
                isLoaded ? (
                    <>
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '300px' }}
                            zoom={11}
                            center={center}
                        >
                            <Marker
                                position={center}
                                icon={{
                                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                    scaledSize: new window.google.maps.Size(50, 50),
                                }}
                            />
                            {
                                address.length > 0 ? (
                                    address.map((item, index: number) => (
                                        <Marker
                                            key={index}
                                            position={{
                                                lat: parseFloat(item.lat),
                                                lng: parseFloat(item.lng),
                                            }}
                                            icon={{
                                                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                                                scaledSize: new window.google.maps.Size(50, 50),
                                            }}
                                        />
                                    ))
                                ) : null
                            }
                        </GoogleMap>
                        <hr />
                        <h3>Current location</h3>
                        <StyledCurrentLocation>
                            <p>{center?.lat}, {center?.lng}</p>
                        </StyledCurrentLocation>
                        {
                            address.length > 0 ? (
                                <>
                                    <StyledItemList>
                                        <h3>Warehouses</h3>
                                        <ul>
                                            {
                                                address.map((item, index) => (
                                                    <li key={index}>
                                                        <p><StyledNearLocation>{item.name}</StyledNearLocation> | {item.address}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </StyledItemList>
                                    <hr />
                                </>
                            ) : null
                        }
                    </>
                ) : 'Loading map ...'
            }
        </div>
    );
};

export default MapComponent;
