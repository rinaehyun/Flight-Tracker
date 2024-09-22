import {APIProvider, Map, Marker} from "@vis.gl/react-google-maps";

type FlightRouteMapProps = {
    originLat: number,
    originLng: number,
    destLat: number,
    destLng: number
}

export default function FlightRouteMap({ originLat, originLng, destLat, destLng }: Readonly<FlightRouteMapProps>) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error("Google Maps API key is missing!");
        return <div>Error: Google Maps API key not provided.</div>;
    }

    const centerLat = (originLat + destLat) / 2;
    const centerLng = (originLng + destLng) / 2;

    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={() => console.log('Maps API has loaded.')}
        >
            <Map
                defaultZoom={1}
                defaultCenter={{ lat: centerLat, lng: centerLng }}
            >
                <Marker position={{ lat: originLat, lng: originLng }} label="Origin" />
                <Marker position={{ lat: destLat, lng: destLng }} label="Destination" />
            </Map>
        </APIProvider>

    )
}