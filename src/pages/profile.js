import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/context";
import { useRouter } from "next/router";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ProfileComponent from "@/component/profileComponent";
import EmptyPage from "@/component/emptyPage";
import { LuMessageSquare, LuChevronUp, LuChevronDown,LuX,LuSend } from "react-icons/lu";
import RecievedMsg from "@/component/recievedMsg";
import SentMsg from "@/component/sentMsg";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const settingModalRef = useRef();
  const chatModalRef = useRef();
  const msgModalRef = useRef();
  const [loggedUser, setLoggedUser] = useState({});
  const [selectedPage, setSelectedPage] = useState("Profile");
  const [remainingUsers, setRemainingUsers] = useState([]);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [chattingUser,setChattingUser] = useState();
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
      if (settingModalRef.current && !settingModalRef.current.contains(event.target)) {
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
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (chatModalRef.current && !chatModalRef.current.contains(event.target)) {
        if(msgModalRef.current && !msgModalRef.current.contains(event.target)){
          setShowChatModal(false);
        }
      }
    };

    if (showChatModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showChatModal]);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (msgModalRef.current && !msgModalRef.current.contains(event.target)) {
        setShowMsgModal(false);
      }
    };

    if (showMsgModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMsgModal]);
  return (
    <div className="p-[3.2rem]">
      <div className="flex font-normal">
        <div style={{backgroundImage: 'linear-gradient(to bottom, #3C57C8, #5542C8)'}} className="border-r-2 border-slate-200 w-[17.5rem] bg-[#3C57C8] rounded-xl min-h-[100vh] px-[2.5rem] flex flex-col justify-center">
          <div className="text-[white] relative text-bold">
            <div
              className={`py-[1rem] border-b-2 font-normal ${selectedPage==!'Profile'?'bg-[#8383D9] border-#8383D9':'text-[white] border-white'}`}
              onClick={() => setSelectedPage("Profile")}
            >
              Profile
            </div>
            <div
              className={`py-[1rem] border-b-2 font-normal ${selectedPage==!'Posts'?'bg-[#8383D9] border-#8383D9':'text-[white] border-white'}`}
              onClick={() => setSelectedPage("Posts")}
            >
              Posts
            </div>
            <div
              className={`py-[1rem] border-b-2 font-normal ${selectedPage==!'Gallery'?'bg-[#8383D9] border-#8383D9':'text-[white] border-white'}`}
              onClick={() => setSelectedPage("Gallery")}
            >
              Gallery
            </div>
            <div
              className={`py-[1rem] border-b-2 font-normal ${selectedPage==!'ToDo'?'bg-[#8383D9] border-#8383D9':'text-[white] border-white'}`}
              onClick={() => setSelectedPage("ToDo")}
            >
              ToDo
            </div>
          </div>
        </div>
        <div className=" ml-[3.2rem] w-full">
          <div className="flex justify-between items-center border-b-2 border-slate-200 w-full pb-[1rem]">
            <h2 className="text-[1.2rem] font-bold">{selectedPage}</h2>
            <div
              className="flex"
              onClick={() => {
                setShowSettingModal(true);
                
              }}
            >
              <img
                className="w-[30px] rounded-full mr-[1rem]"
                src={loggedUser?.profilepicture}
              ></img>
              <p className="text-[1.2rem] font-medium">{loggedUser?.name}</p>
            </div>
            {showSettingModal && (
              <div
                ref={settingModalRef}
                className="modal bg-white h-fit w-fit px-[2rem] py-[2.75rem] absolute right-12 top-[6.5rem] z-10 shadow-[5px_0px_62px_-12px_rgba(0,0,0,0.3)] rounded-xl text-center"
              >
                <img
                  className="w-[5rem] rounded-full mx-auto"
                  src={loggedUser?.profilepicture}
                ></img>
                <p className="w-fit text-[1rem] mx-auto">{loggedUser?.name}</p>
                <p className="w-fit mx-auto">{loggedUser?.email}</p>
                <div
                  className="flex items-center border-t-2 border-slate-200 py-[11px] px-[1.7rem]"
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
                  className="flex items-center border-t-2 border-slate-200 py-[11px] px-[1.7rem]"
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
      <div className="float-right flex">
        {showMsgModal&&<div className="msgModal w-[17.5rem] mr-[28px] fixed bottom-[0rem] right-[25%]" ref={msgModalRef}>
          <div
            className="pl-[14px] pt-[13px] pr-[13px] pb-[9px] flex items-center justify-between rounded-t-xl cursor-pointer bg-[#2C65C8] text-[white] rounded-t-xl"
            onClick={() => {
              setShowMsgModal((prev) => !prev);
            }}
          >
            <div className="flex items-center justify-between ">
              <img className="w-[2rem] rounded-full" src={chattingUser?.profilepicture} />
              <p className="text-[16px] text-[white]"> {chattingUser?.name}</p>
            </div>
            <div className="flex">
              <LuChevronDown className="text-[white]"/>
              <LuX  className="text-[white]"/>
            </div>
          </div>
          <div className="w-[100%] h-[18rem] px-[24px] bg-[white] overflow-y-scroll border-x-2 border-[#2C65C8]">
            <RecievedMsg key='index1' msg='Lorem epsum nad anda nda '/>
            <RecievedMsg key='index2' msg='Lorem epsum nad anda nda epsum nad anda nda'/>
            <p>9:42AM</p>
            <SentMsg key='index3' msg='Lorem epsum nad anda nda '/>
            <SentMsg key='index4' msg='Lorem epsum nad anda nda '/>
            <RecievedMsg key='index1' msg='Lorem epsum nad anda nda '/>
            <SentMsg key='index5' msg='Lorem epsum nad anda nda '/>
          </div>
          <div className="flex border-t-2 border-x-2 border-slate-200">
            <input type="text" className="w-[100%]"/>
            <LuSend className="text-[#2C65C8] text-[1.5rem]"/>
          </div>
        </div>}
        <div
          className={`text-[22px] w-[17.5rem] chat float-right bg-[#2C65C8] text-[white] rounded-t-xl cursor-pointer ${
            showChatModal && "fixed right-[51px] bottom-[0rem] z-10"
          } `}
        >
          <div
            className="pl-[20px] pt-[15px] pr-[17px] pb-[12px] flex items-center  justify-between rounded-t-xl cursor-pointer"
            onClick={() => {
              setShowChatModal((prev) => !prev);
              
            }}
          >
            <div className="flex items-center justify-between w-[6.25rem]">
              <LuMessageSquare className="icon" />
              <p className=" text-[white]">Chats</p>
            </div>
            {showChatModal ? <LuChevronDown /> : <LuChevronUp />}
          </div>
          {showChatModal && (
            <div
              className="chat-users h-[20rem] overflow-y-scroll"
              style={{
                backgroundColor: "white",
                border: "1px solid blue",
                width: "100%",
              }}
              ref={chatModalRef}
              onScroll={(e)=>{
                
              }}
            >
              {remainingUsers?.length > 0 &&
                remainingUsers?.map((item,index) => {
                  return (
                    <div
                      className="flex items-center pt-[10px] px-[2.8rem] justify-between text-[14px]"
                      key={index}
                      onClick={() => {
                        setShowMsgModal(true)
                        setChattingUser(item)
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
      
    </div>
  );
};

export default Profile;
