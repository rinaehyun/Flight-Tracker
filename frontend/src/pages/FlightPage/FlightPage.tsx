import {Flight} from "../../types/model/dataType.ts";
import FlightList from "./components/FlightList.tsx";
import FlightFilter from "./components/FlightFilter.tsx";

type FlightPageProps = {
    data: Flight[]
}

export default function FlightPage({ data }: FlightPageProps) {

    return (
        <div>
            <FlightFilter />
            <FlightList data={data}/>
        </div>
    )
}