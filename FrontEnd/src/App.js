import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@mui/icons-material";
import axios from "axios";
// import { format } from "react-time-ago";
import Register from "./components/Register";
import Login from "./components/Login";
import "mapbox-gl/dist/mapbox-gl.css";



function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 19.0760, // Default latitude (Mumbai)
    longitude: 72.8777, // Default longitude
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, latitude, longitude) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: latitude, longitude: longitude });
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({ latitude: lat, longitude: lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      latitude: newPlace.latitude,
      longitude: newPlace.longitude,
    };
    try {

      const res = await axios.post("https://inn-travelpin-aryanbhoi.onrender.com/api/pins/postPin", newPin);
      
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.error("Error posting new pin:", err);
      alert("Failed to add pin. Please try again later.");
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {

        const allPins = await axios.get("https://inn-travelpin-aryanbhoi.onrender.com/api/pins/getPin");
        setPins(allPins.data);
      } catch (err) {
        console.error("Error fetching pins:", err);
      }
    };
    getPins();
  }, []);

  useEffect(() => {
    // Get user's current location

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewport((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 14, // Adjust zoom for better visibility
          }));
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken= "pk.eyJ1IjoiYXJ5YW5iaG9pIiwiYSI6ImNtM2lwY2JvdjAzYTgya3NicWFhOTlibm0ifQ.4vjKB3hFdHBUhOvz-w7rSw"
        //{process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ width: "100%", height: "100%" }}
        transitionDuration="200"
        mapStyle="mapbox://styles/aryanbhoi/cm3k6ktn300nd01seedxa5sxs"
        onMove={(evt) => setViewport(evt.viewState)}
        onDblClick={currentUsername && handleAddClick}
      >
        {pins.map((p) => (
          <Marker
            key={p._id}
            latitude={p.latitude}
            longitude={p.longitude}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <Room
              style={{
                fontSize: 7 * viewport.zoom,
                color: currentUsername === p.username ? "tomato" : "slateblue",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.latitude, p.longitude)}
            />
          </Marker>
        ))}

        {pins.map((p) => (
          p._id === currentPlaceId && (
            <Popup
              key={p._id}
              latitude={p.latitude}
              longitude={p.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  {Array.from({ length: p.rating }, (_, index) => (
                    <Star key={index} className="star" />
                  ))}
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
              </div>
            </Popup>
          )
        ))}

        {newPlace && (
          <>
            <Marker
              latitude={newPlace.latitude}
              longitude={newPlace.longitude}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.latitude}
              longitude={newPlace.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label><h2>Title</h2></label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label><h3>Description</h3></label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label><h3>Rating</h3></label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}

        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}

        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
