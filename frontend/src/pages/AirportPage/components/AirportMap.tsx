import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";

type AirportMapProps = {
    latitude: number,
    longitude: number
}

export default function AirportMap({ latitude, longitude }: Readonly<AirportMapProps>) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error("Google Maps API key is missing!");
        return <div>Error: Google Maps API key not provided.</div>;
    }

    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={() => console.log('Maps API has loaded.')}
        >
            <Map
                defaultZoom={3}
                defaultCenter={{ lat: latitude, lng: longitude }}
            >
                <Marker position={{ lat: latitude, lng: longitude }} />
            </Map>
        </APIProvider>

    )
}