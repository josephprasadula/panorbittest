import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/context";
import { useRouter } from "next/router";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ProfileComponent from "@/component/profileComponent";
import EmptyPage from "@/component/emptyPage";
import { LuMessageSquare, LuChevronUp, LuChevronDown } from "react-icons/lu";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const modalRef = useRef();
  const [loggedUser, setLoggedUser] = useState({});
  const [selectedPage, setSelectedPage] = useState("Profile");
  const [remainingUsers, setRemainingUsers] = useState([]);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  useEffect(() => {
    console.log("query", router?.query?.id);
    // console.log(
    //   "user",
    //   user?.filter((item) => item?.id == router?.query?.id)
    // );
    setLoggedUser(...user?.filter((item) => item?.id == router?.query?.id));
    setRemainingUsers(user?.filter((item) => item?.id != router?.query?.id));
  }, [router?.query?.id]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSettingModal(false);
      }
    };

    if (showSettingModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettingModal]);
  return (
    <div className="p-[3.2rem]">
      <div className="flex font-normal">
        <div className="border-r-2 border-slate-200 w-[17.5rem] bg-[#3E56C8] rounded-xl min-h-[100vh] px-[2.5rem]">
          <div className="text-[white] relative top-[50%]">
            <div
              className="py-[1rem] border-b-2 border-white font-normal"
              onClick={() => setSelectedPage("Profile")}
            >
              Profile
            </div>
            <div
              className="py-[1rem] border-b-2 border-white font-normal"
              onClick={() => setSelectedPage("Posts")}
            >
              Posts
            </div>
            <div
              className="py-[1rem] border-b-2 border-white font-normal"
              onClick={() => setSelectedPage("Gallery")}
            >
              Gallery
            </div>
            <div
              className="py-[1rem] border-b-2 border-white font-normal"
              onClick={() => setSelectedPage("ToDo")}
            >
              ToDo
            </div>
          </div>
        </div>
        <div className=" ml-[3.2rem] w-full">
          <div className="flex justify-between items-center border-b-2 border-slate-200 w-full pb-[1rem]">
            <h2 className="text-[1.5rem] font-medium">{selectedPage}</h2>
            <div
              className="flex"
              onClick={() => {
                setShowSettingModal(true);
              }}
            >
              <img
                className="w-[2.3rem] rounded-full mr-[1rem]"
                src={loggedUser?.profilepicture}
              ></img>
              <p className="text-[1.5rem]">{loggedUser?.name}</p>
            </div>
            {showSettingModal && (
              <div
                ref={modalRef}
                className="modal bg-white h-fit w-fit px-[2rem] py-[2.75rem] absolute right-28 top-28 z-10 shadow-xl rounded-xl text-center"
              >
                <img
                  className="w-[5rem] rounded-full mx-auto"
                  src={loggedUser?.profilepicture}
                ></img>
                <p className="w-fit text-[1rem] mx-auto">{loggedUser?.name}</p>
                <p className="w-fit mx-auto">{loggedUser?.email}</p>
                <div
                  className="flex items-center border-t-2 border-slate-200 py-[11px] px-[2.8rem]"
                  onClick={() => {
                    setLoggedUser(remainingUsers[0]);
                    router.push(`/profile?id=${remainingUsers[0]?.id}`);
                    setShowSettingModal(false);
                  }}
                >
                  <img
                    className="w-[2rem] rounded-full mr-[1rem]"
                    src={remainingUsers[0]?.profilepicture}
                  ></img>
                  <p className="text-[1rem]">{remainingUsers[0]?.name}</p>
                </div>
                <div
                  className="flex items-center border-t-2 border-slate-200 py-[11px] px-[2.8rem]"
                  onClick={() => {
                    router.push(`/profile?id=${remainingUsers[1]?.id}`);
                    setShowSettingModal(false);
                  }}
                >
                  <img
                    className="w-[2rem] rounded-full mr-[1rem]"
                    src={remainingUsers[1]?.profilepicture}
                  ></img>
                  <p className="text-[1rem]">{remainingUsers[1]?.name}</p>
                </div>
                <button
                  className="bg-[#d55151] rounded-xl py-[11px] px-[1rem] w-fit mx-auto text-[white]"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          {selectedPage == "Profile" ? (
            <ProfileComponent loggedUser={loggedUser} />
          ) : (
            <EmptyPage></EmptyPage>
          )}
        </div>
      </div>
      <div
        className={`text-[22px] w-[17.5rem] chat float-right bg-[#2C65C8] text-[white] rounded-t-xl cursor-pointer relative ${
          showChatModal && "translate-y-[30rem] z-10"
        }`}
      >
        <div
          className="pl-[20px] pt-[15px] pr-[17px] pb-[12px] flex items-center  justify-between rounded-t-xl cursor-pointer"
          onClick={() => {
            setShowChatModal((prev) => !prev);
          }}
        >
          <div className="flex items-center justify-between w-[6.25rem]">
            <LuMessageSquare />
            <p>Chats</p>
          </div>
          {showChatModal ? <LuChevronDown /> : <LuChevronUp />}
        </div>
        {showChatModal && (
          <div
            className="chat-users h-[40%] overflow-y-scroll"
            style={{
              backgroundColor: "white",
              border: "1px solid blue",
              width: "100%",
            }}
          >
            {remainingUsers?.length > 0 &&
              remainingUsers?.map((item) => {
                return (
                  <div
                    className="flex items-center pt-[10px] px-[2.8rem] justify-between text-[14px]"
                    onClick={() => {
                      // setLoggedUser(remainingUsers[0]);
                      // router.push(`/profile?id=${remainingUsers[0]?.id}`);
                      // setShowSettingModal(false);
                    }}
                  >
                    <img
                      className="w-[2rem] rounded-full mr-[1rem]"
                      src={item?.profilepicture}
                    ></img>
                    <p className="text-[1rem] text-[black]">{item?.name}</p>
                    <p
                      style={{
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "50%",
                        backgroundColor: "green",
                      }}
                    ></p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
