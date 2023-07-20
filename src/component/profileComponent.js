import React, { useState, useEffect } from "react";
import { useUser } from "@/context/context";
import { useRouter } from "next/router";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const ProfileComponent = ({ loggedUser }) => {

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  useEffect(() => {
    if (loggedUser?.address) {
      setCenter({
        lat: Number(loggedUser?.address?.geo?.lat),
        lng: Number(loggedUser?.address?.geo?.lng),
      });
    }
  }, [loggedUser]);
  const containerStyle = {
    width: "624px",
    height: "400px",
  };
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC8el26G9at23oUC5ig-1Fcx8uaFb8kH1Y",
  });

  return (
    <div className="flex w-full ">
      <div className="border-r-2 border-slate-200 w-[40%]">
        <div className="mx-auto">
          <img
            className="w-[13rem] rounded-full"
            src={loggedUser?.profilepicture}
          ></img>
          <h3>{loggedUser?.name}</h3>
        </div>

        <div className="grid grid-cols-3">
          <p>Username</p>
          <p>:</p>
          <p>{loggedUser?.username}</p>
          <p>e-mail</p>
          <p>:</p>
          <p>{loggedUser?.email}</p>
          <p>Phone</p>
          <p>:</p>
          <p>{loggedUser?.phone}</p>
          <p>Website</p>
          <p>:</p>
          <p>{loggedUser?.website}</p>
        </div>
        <h2>Company</h2>
        <div className="grid grid-cols-3">
          <p>Name</p>
          <p>:</p>
          <p>{loggedUser?.company?.name}</p>
          <p>catchPhrase</p>
          <p>:</p>
          <p>{loggedUser?.company?.catchPhrase}</p>
          <p>bs</p>
          <p>:</p>
          <p>{loggedUser?.company?.bs}</p>
        </div>
      </div>
      <div>
        <h2>Address :</h2>
        <div className="grid grid-cols-3">
          <p>Street</p>
          <p>:</p>
          <p>{loggedUser?.address?.street}</p>
          <p>Suite</p>
          <p>:</p>
          <p>{loggedUser?.address?.suite}</p>
          <p>City</p>
          <p>:</p>
          <p>{loggedUser?.address?.city}</p>
          <p>Zipcode</p>
          <p>:</p>
          <p>{loggedUser?.address?.zipcode}</p>
        </div>
        <div>
          <div className="rounded-xl">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <></>
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
