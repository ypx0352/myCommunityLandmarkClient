import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { fromJS } from "immutable";
import { message } from "antd";
import * as actionTypes from "../../../store/actionTypes";
import * as actionCreators from "../../../store/actionCreators";
import icon from "../../../image/myCommunityLandmarkLogo.png";

const GoogleMapComponent = (props) => {
  const {
    placesInStore,
    setMapSpinning,
    addMarker,
    setShowCommentPanel,
    getPlaces,
    selectedMarker,
    setSelectedMarker,
    closeSidePanel,
    setShowNewPlacePanel,
    newPlaceLoaction,
    setNewPlaceLocation,
  } = props;

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [places, setPlaces] = useState([]);
  const [currentLocationFetched, setCurrentLocationFetched] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_.GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded) {
      setMapSpinning(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    getPlaces("all");
  }, []);

  useEffect(() => {
    setPlaces(placesInStore);
  }, [placesInStore]);

  const defaultPosition = { lat: -27.470362890415256, lng: 153.0260323235481 };

  const generateMarkers = (places) => {
    return places.map((item) => (
      <Marker
        key={item._id}
        position={{ lat: item.lat, lng: item.lng }}
        icon={{ url: icon, scaledSize: new window.google.maps.Size(35, 35) }}
        onClick={() => {
          setSelectedMarker(item);
          setNewPlaceLocation({});
          setShowCommentPanel();
        }}
      />
    ));
  };

  const generateCurrentLoactionMarker = (lat, lng) => {
    return (
      <Marker
        position={{ lat: lat, lng: lng }}
        onClick={() => {
          setSelectedMarker({
            name: "Your current location",
            lat: lat,
            lng: lng,
            comments: [],
          });
          setNewPlaceLocation({});
        }}
      />
    );
  };

  // Get user's location.
  if (!navigator.geolocation) {
    message.error("Your browser does not support the application.");
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setCurrentLocationFetched(true);
      },
      () => {
        setCurrentLocationFetched(false);
      }
    );
  }

  const map = (zoom, lat, lng) => {
    return (
      <GoogleMap
        zoom={zoom}
        center={{ lat: lat, lng: lng }}
        mapContainerClassName="map-wrapper"
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          overflowY: "visible",
        }}
        onClick={(e) => {
          addMarker(e.latLng);
          setSelectedMarker({});
          setShowNewPlacePanel();
        }}
      >
        {generateCurrentLoactionMarker(lat, lng)}
        {generateMarkers(places)}
        {selectedMarker.name && (
          <InfoWindow
            position={{
              lat: selectedMarker.lat,
              lng: selectedMarker.lng,
            }}
            onCloseClick={() => {
              setSelectedMarker({});
              closeSidePanel();
            }}
          >
            <>
              <h3>{selectedMarker.name}</h3>
              {selectedMarker.creator ? (
                <h5>Creator: {selectedMarker.creator}</h5>
              ) : (
                ""
              )}
            </>
          </InfoWindow>
        )}
        {newPlaceLoaction.lat && (
          <InfoWindow
            position={{
              lat: newPlaceLoaction.lat,
              lng: newPlaceLoaction.lng,
            }}
            onCloseClick={() => {
              setNewPlaceLocation({});
              closeSidePanel();
            }}
          >
            <h3>New place explored! Leave a comment!</h3>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };

  if (isLoaded && currentLocationFetched) {
    return map(15, lat, lng);
  } else if (isLoaded && !currentLocationFetched) {
    return map(10, defaultPosition.lat, defaultPosition.lng);
  }
};

const mapStateToProps = (state) => ({
  placesInStore: state.get("places").toJS(),
  selectedMarker: state.get("selectedMarker").toJS(),
  newPlaceLoaction: state.get("newPlaceLocation").toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  setMapSpinning(spinning) {
    dispatch({ type: actionTypes.MAP_SPINNING, value: fromJS(spinning) });
  },

  addMarker(latLng) {
    dispatch({
      type: actionTypes.SET_SHOW_NEW_PLACE_PANEL,
    });
    const lat = latLng.lat();
    const lng = latLng.lng();
    dispatch({
      type: actionTypes.SET_NEW_PLACE_LOCATION,
      value: fromJS({ lat, lng }),
    });
  },

  setShowCommentPanel() {
    dispatch({
      type: actionTypes.SET_SHOW_COMMENT_PANEL,
    });
  },

  getPlaces(creator) {
    dispatch(actionCreators.getPlacesAction(creator));
  },

  setSelectedMarker(marker) {
    dispatch({ type: actionTypes.SET_SELECTED_MARKER, value: fromJS(marker) });
  },

  closeSidePanel() {
    dispatch({ type: actionTypes.CLOSE_SIDE_PANEL });
  },

  setShowNewPlacePanel() {
    dispatch({ type: actionTypes.SET_SHOW_NEW_PLACE_PANEL });
  },

  setNewPlaceLocation() {
    dispatch({ type: actionTypes.SET_NEW_PLACE_LOCATION, value: fromJS({}) });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapComponent);
