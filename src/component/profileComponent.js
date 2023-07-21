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
      <div className="border-r-2 border-slate-200 ">
        <div className="mx-auto w-fit">
          <img
            style={{ width: "13rem" }}
            className="w-[10rem] rounded-full"
            src={loggedUser?.profilepicture}
          ></img>
          <h3>{loggedUser?.name}</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          <p className="w-fit">Username</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.username}</p>
          <p className="w-fit">e-mail</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.email}</p>
          <p className="w-fit">Phone</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.phone}</p>
          <p className="w-fit">Website</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.website}</p>
        </div>
        <h2>Company</h2>
        <div
          className="grid grid-cols-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
        >
          <p className="w-fit">Name</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.company?.name}</p>
          <p className="w-fit">catchPhrase</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.company?.catchPhrase}</p>
          <p className="w-fit">bs</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.company?.bs}</p>
        </div>
      </div>
      <div>
        <h2>Address :</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          <p className="w-fit">Street</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.address?.street}</p>
          <p className="w-fit">Suite</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.address?.suite}</p>
          <p className="w-fit">City</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.address?.city}</p>
          <p className="w-fit">Zipcode</p>
          <p className="w-fit">:</p>
          <p className="w-fit">{loggedUser?.address?.zipcode}</p>
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
