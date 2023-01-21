import React, { useEffect } from "react";
import { addressSchema } from "../types/site";
import { Result, useSearchActions, useSearchState } from "@yext/search-headless-react";
import { MapboxMap } from "@yext/search-ui-react";
import Location from "../types/search/locations";
import MapPin from "./MapPin";
import P from "./P";
import LocationLink from "./LocationLink";
import { Link } from "@yext/pages/components";
import { FaAirbnb } from "react-icons/fa";

const LodgingMap = (): JSX.Element => {

  useEffect(() => {
    searchActions.setVertical("locations");
    // searchActions.setStaticFilters([
    //   {
    //     displayName: "Recommended Lodging Only",
    //     selected: true,
    //     filter: {
    //       kind: "fieldValue",
    //       fieldId: "c_locationTypre",
    //       matcher: Matcher.Equals,
    //       value: "RECOMMENDATION",
    //     }
    //   }
    // ]);
    searchActions.executeVerticalQuery();
  }, []);

  const searchActions = useSearchActions();
  const results = useSearchState(s => s.vertical.results) as unknown as Result<Location>[];

  return (
    <div className="w-full flex flex-row gap-x-4 h-full">
      <div className="w-2/5 h-full">
        <P>
          Here are some recommended lodging options. In addition to these hotels, you might
          also want to check out AirBnB options for larger groups.
        </P>
        <Link
          className="my-2 w-fit no-underline px-2 py-1 rounded-md bg-green-1000 hover:bg-green-1100 text-white font-lobsterTwo text-lg flex flex-row gap-x-2 items-center"
          href="https://www.airbnb.com/s/Cascais--Lisbon--Portugal/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&price_filter_input_type=0&price_filter_num_nights=3&query=Cascais%2C%20Portugal&place_id=ChIJl5q3eXPEHg0RwrsHGH47DYc&date_picker_type=calendar&checkin=2023-07-06&checkout=2023-07-09&source=structured_search_input_header&search_type=filter_change&ne_lat=38.75221941495005&ne_lng=-9.386910168780133&sw_lat=38.65630280906688&sw_lng=-9.48625650848274&zoom=13&search_by_map=true&room_types%5B%5D=Entire%20home%2Fapt">
          Explore AirBnB Options
          <FaAirbnb />
        </Link>
        <div className="flex flex-col gap-y-2 mt-4">
          {/* A header that says "Nearby Hotels" with a grey line extending right */}
          <div className="flex flex-row items-center gap-x-2 mt-4">
            <h2 className="font-lobsterTwo text-2xl text-green-1100 shrink-0">Nearby Hotels</h2>
            <div className="h-0.5 w-full bg-green-1100/10" />
          </div>
          {
            results && results.length > 0 && results.map((location: Result<Location>) => {
              const address = addressSchema.parse(location.rawData.address);
              return (
                <div
                  key={location.id}
                  className="py-2 px-3  rounded-lg flex flex-col gap-y-1 w-fit"
                >
                  <Link
                    href={location.rawData.websiteUrl?.url ?? "/"}
                    target="_blank"
                    className="font-lobsterTwo text-lg text-green-1100">
                    {location.rawData.name}
                  </Link>
                  <div>
                    <LocationLink address={address} />
                  </div>
                </div>
              )
            }
            )
          }
        </div>
      </div>
      <div className="h-2/3 w-3/5 shrink-0 relative rounded-lg overflow-hidden">
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
    </div>
  )
}


export default LodgingMap;