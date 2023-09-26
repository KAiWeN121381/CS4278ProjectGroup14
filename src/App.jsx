import MapComponent from "./components/MapComponent";
import PostGroup from "./components/PostGroup";
import InlineShareButtons from "./components/ShareButtons";

function App() {
  return <div>
    <PostGroup />
    <MapComponent></MapComponent>
    <InlineShareButtons></InlineShareButtons>
  </div>;
}

export default App;
