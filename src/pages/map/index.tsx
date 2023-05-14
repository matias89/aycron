import { useEffect , useState, useMemo, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import type { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { useRouter } from 'next/router';
import { useUser } from '@/utils/hooks';

import { post } from '@/utils/http';

import MapComponent from '@/components/Map/Map';
import Search from '@/components/Search/Search';
import Button from '@/components/Button/Button';

import type { TItem } from '@/utils/types';

type TMapConfig = {
    googleMapsApiKey: string;
    libraries: Libraries;
};

type TLatLong = {
    lat: number;
    lng: number;
};

const mapConfig: TMapConfig = {
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
};

const MapView = () => {
    const router = useRouter();
    const [center, setCenter] = useState(null);
    const [address, setAddress] = useState([]);
    const [isApiCalled, setIsApliCalled] = useState(false);
    const { isLogged, isLoaded: isPageLoaded } = useUser();
    const { isLoaded, loadError } = useLoadScript(mapConfig);
    const handleOnSetLatLong = async (latLong: TLatLong) => {
        setCenter(latLong);
        const warehouses = await post('warehouses/near', {
            lat: latLong.lat,
            lng: latLong.lng,
        });
        setIsApliCalled(true);
        if (warehouses.length > 0) {
            setAddress(warehouses.map((item: TItem) => ({
                lat: item.lat,
                lng: item.lng,
                name: item.name,
                address: `${item.address}, ${item.state}, ${item.country} - CP ${item.zip} - ${(item.distance * 1.60934).toFixed(2)}Km`,
            })));
        }
    };
    const getCenter = useCallback(
        () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                });
            }
        }, [setCenter]
    );
    // Side effects
    useEffect(() => {
        if (!isLogged && isPageLoaded) {
            router.push('/users/login');
        }
    }, [isLogged, router, isPageLoaded]);
    useEffect(() => {
        getCenter();
    }, [getCenter]);
    return (
        <div>
            <h2>Nearest warehouse calculation</h2>
            <hr />
            <Button onClick={() => router.push('/home')}>Back to home</Button>
            <hr />
            <Search
                isMapLoaded={isLoaded}
                callback={handleOnSetLatLong}
            />
            <hr />
            <MapComponent isLoaded={isLoaded} center={center} address={address} />
            {
                isApiCalled && address.length === 0 ? (
                    <>
                        <hr />
                        <h3>There is no data in the database</h3>
                    </>
                ) : null
            }
            {
                loadError ? (
                    <h3>Error loading map</h3>
                ) : null
            }
        </div>
    );
};

export default MapView;
