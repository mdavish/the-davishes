import React, { useEffect } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { MapboxMap } from "@yext/search-ui-react";
import Location from "../types/search/locations";
import MapPin from "./MapPin";

const LodgingMap = (): JSX.Element => {

  useEffect(() => {
    searchActions.setVertical("locations");
    searchActions.executeVerticalQuery();
  }, []);

  const searchActions = useSearchActions();

  return (
    <div className="h-2/3 relative rounded-lg overflow-hidden">
      <MapboxMap<Location>
        PinComponent={MapPin}
        mapboxOptions={{
          style: "mapbox://styles/mapbox/streets-v11",
          zoom: 12,
          center: {
            lat: 38.69627313793442, lng: -9.419488552606975,
          }
        }}
        mapboxAccessToken="pk.eyJ1IjoibWRhdmlzaCIsImEiOiJja3pkNzZ4cDYydmF6MnZtemZrNXJxYmtvIn0.9CYfaiw9PB90VlQEqt3dRQ" />
    </div>
  )
}


export default LodgingMap;