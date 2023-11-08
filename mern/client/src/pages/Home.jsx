import MapComponent from "../components/MapComponent";
import PostGroup from "../components/PostGroup";

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
                <PostGroup key="PostGroup"/>
            </div>
        </div>
    </div>)
}