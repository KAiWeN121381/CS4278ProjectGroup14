import MapComponent from "../components/MapComponent";
import PostGroup from "../components/PostGroup";
import InlineShareButtons from "../components/ShareButtons";

export default function Home() {
    return (
    <div>
        <PostGroup />
        <MapComponent></MapComponent>
        <InlineShareButtons></InlineShareButtons>
    </div>)
}