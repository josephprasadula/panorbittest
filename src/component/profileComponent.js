import React, { useState, useEffect } from "react";
import { useUser } from "@/context/context";
import { useRouter } from "next/router";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const ProfileComponent = ({ loggedUser }) => {
  const [center, setCenter] = useState();

  useEffect(() => {
    if (loggedUser?.address) {
      setCenter({
        lat: Number(loggedUser?.address?.geo?.lat),
        lng: Number(loggedUser?.address?.geo?.lng),
      });
    }
  }, [loggedUser?.address?.geo]);
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
    <div style={{marginTop:'34px'}} className="flex w-full">
      <div className="border-r-2 border-slate-200 ">
        <div className="mx-auto w-fit text-center">
          <img
            style={{ width: "13rem" }}
            className="w-[10rem] rounded-full"
            src={loggedUser?.profilepicture}
          ></img>
          <h3 style={{color:'#545454',fontWeight:800}}>{loggedUser?.name}</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          <p style={{color:'#9A9A9A'}} className="w-fit text-[#9A9A9A]">Username :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit text-[#545454]">{loggedUser?.username}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">e-mail :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.email}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">Phone :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.phone}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">Website :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.website}</p>
        </div>
        <div className="text-center">
          <h2 style={{color:'#545454',fontWeight:800}}>Company</h2>
        </div>
        <div
          className="grid grid-cols-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
        >
          <p style={{color:'#9A9A9A'}} className="w-fit">Name :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.company?.name}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">catchPhrase :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.company?.catchPhrase}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">bs :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.company?.bs}</p>
        </div>
      </div>
      <div style={{paddingLeft:'48px'}} className="pl-[48px]">        
        <div className="text-center">
          <h2 style={{color:'#545454',fontWeight:800}}>Address</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)",width:'50%' }}>
          <p style={{color:'#9A9A9A'}} className="w-fit">Street :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.address?.street}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">Suite :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.address?.suite}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">City :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.address?.city}</p>
          <p style={{color:'#9A9A9A'}} className="w-fit">Zipcode :</p>
          <p style={{color:'#545454',fontWeight:800}} className="w-fit">{loggedUser?.address?.zipcode}</p>
        </div>
        <div>
          <div className="rounded-xl">
            {center&&isLoaded && (
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
