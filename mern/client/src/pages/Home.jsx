import LocationSelection from "../components/LocationSelection";
import MapComponent from "../components/MapComponent";
import PostGroup from "../components/PostGroup";
import SearchBar from "../components/SearchBar";

// The home page
export default function Home() {
    return (
    <div>
        {/* Separated into left and right sections
            Left section contains the map
            Right section includes search bar and post displays */}
        <div className="left_right_separator">
            <div className="home-left">
                <MapComponent />
            </div>
            <div className="home-right">
                {/* <div className="search-area">
                    <LocationSelection />
                    <SearchBar />
                </div> */}
                <PostGroup />
            </div>
        </div>
    </div>)
}