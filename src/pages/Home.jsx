import LocationSelection from "../components/LocationSelection";
import MapComponent from "../components/MapComponent";
import PostGroup from "../components/PostGroup";
import SearchBar from "../components/SearchBar";
import InlineShareButtons from "../components/ShareButtons";

export default function Home() {
    return (
    <div>
        <div className="left_right_separator">
            <div className="home-left">
                <MapComponent></MapComponent>
            </div>
            <div className="home-right">
                <div className="search-area">
                    <LocationSelection/>
                    <SearchBar />
                </div>
                <PostGroup />
            </div>
        </div>
    </div>)
}