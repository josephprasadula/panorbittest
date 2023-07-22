import Image from "next/image";
import { useUser } from "@/context/context";
import { useRouter } from "next/router";
export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  console.log("users", user);
  return (
    <main
      // className={`flex min-h-screen flex-col items-center justify-between`}
      className="w-full h-[100vh] font-normal"
    >
      <img src="/1.png" className="bg-[#a204ff]" />
      <div style={{overflow:'hidden'}} className="w-[39%] mx-auto my-auto rounded-xl shadow-lg absolute inset-x-0 top-[15%]">
        <h1 className="bg-[#F6F6F6] w-full py-[2.2rem] px-[11rem] text-[1.2rem] text-[#5B5B5B] font-bold">
          Select an account
        </h1>
        <div className="px-[2.5rem] bg-white h-[50vh] overflow-y-scroll">
          {user &&
            user?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="flex py-[10px] border-b-2 border-slate-200 items-center"
                  onClick={() => {
                    router.push(`/profile?id=${item?.id}`);
                  }}
                >
                  <img
                    className="w-[2.3rem] rounded-full mr-[1rem]"
                    src={item?.profilepicture}
                  ></img>
                  <p className="text-[1rem]">{item?.name}</p>
                </div>
              );
            })}
        </div>

        <div></div>
      </div>
    </main>
  );
}
