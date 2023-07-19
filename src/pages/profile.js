import React, { useState, useEffect } from "react";
import { useUser } from "@/context/context";
import { useRouter } from "next/router";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState({});
  useEffect(() => {
    console.log("query", router?.query?.id);
    console.log(
      "user",
      user?.filter((item) => item?.id == router?.query?.id)
    );
    setLoggedUser(...user?.filter((item) => item?.id == router?.query?.id));
  }, [router?.query?.id]);
  return (
    <div className="flex p-[3.2rem] font-normal">
      <div className="border-r-2 border-slate-200 w-[17.5rem] bg-[#3E56C8] rounded-xl min-h-[100vh] px-[2.5rem]">
        <div className="text-[white] relative top-[50%]">
          <div className="py-[1rem] border-b-2 border-white font-normal">
            Profile
          </div>
          <div className="py-[1rem] border-b-2 border-white font-normal">
            Posts
          </div>
          <div className="py-[1rem] border-b-2 border-white font-normal">
            Gallery
          </div>
          <div className="py-[1rem] border-b-2 border-white font-normal">
            ToDo
          </div>
        </div>
      </div>
      <div className=" ml-[3.2rem]">
        <div className="flex border-b-2 border-black ml-[3.2rem] w-full">
          <div>Profile</div>

          <div className="flex">
            <img
              className="w-[2.3rem] rounded-full mr-[1rem]"
              src={loggedUser?.profilepicture}
            ></img>
            <p className="text-[1rem]">{loggedUser?.name}</p>
          </div>
        </div>
        <div className="flex">
          <div>
            <img src=""></img>
            <div className="flex">
              <p>Username:</p>
              <p></p>
            </div>
            <div className="flex">
              <p>e-mail:</p>
              <p></p>
            </div>
            <div className="flex">
              <p>Phone:</p>
              <p></p>
            </div>
            <div className="flex">
              <p>Website:</p>
              <p></p>
            </div>
            <h2>Company</h2>
            <div className="flex">
              <p>Name:</p>
              <p></p>
            </div>
            <div className="flex">
              <p>catchPhrase:</p>
              <p></p>
            </div>
            <div className="flex">
              <p>bs:</p>
              <p></p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
