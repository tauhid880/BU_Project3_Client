import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MyAppointments from "./MyAppointments";
import Profile from "./Profile";
// import useGetProfile from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("appointment");
  const navigate = useNavigate();

  const {
    data: userData = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["User"],

    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/users/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const deleteHandler = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/users/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      localStorage.clear();
      navigate("/home");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const {
  //   data: userData,
  //   loading,
  //   error,
  // } = useGetProfile(`${BASE_URL}/users/profile/me`);
  // console.log(userData, "studentData");
  // const { name, photo, id, email, batch } = userData.data;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <section>
      <div className="max-w-[1170px] min-h-screen px-5 mx-auto">
        {isLoading && !error && <Loading />}
        {error && !isLoading && <Error errMessage={error} />}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              {userData.data?.batch ? (
                ""
              ) : (
                <p className="text-center mb-10 text-[18px] font-bold text-red-500">
                  Kindly update your batch number in profile setting.
                </p>
              )}
              <div className="flex items-center justify-center">
                <figure className="w-[200px] h-[200px] rounded-full border-2 border-solid border-primaryColor ">
                  <img
                    className="w-full h-full rounded-full"
                    src={userData.data?.photo}
                    alt=""
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.data?.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  <span className="font-bold text-black">Email :</span>{" "}
                  {userData.data?.email}
                </p>
                <p className="mt-2 text-textColor text-[15px] leading-6 font-medium">
                  <span className="font-bold text-black">ID :</span>{" "}
                  {userData.data?.id}
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>

                <button
                  onClick={() => deleteHandler(userData.data?._id)}
                  className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="flex justify-between items-center lg:flex-none lg:justify-start lg:items-baseline">
                <button
                  onClick={() => setTab("appointment")}
                  className={`${
                    tab === "appointment" &&
                    "bg-primaryColor text-white font-normal"
                  } lg:py-2 lg:mr-5 lg:mb-3 px-3 lg:px-5 rounded-sm text-headingColor font-semibold text-[12px] lg:text-[16px] leading-7 border border-solid border-primaryColor `}
                >
                  My Appointments
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } lg:py-2 px-3 lg:px-5 rounded-sm text-headingColor font-semibold text-[12px] lg:text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "appointment" && (
                <MyAppointments refetch={refetch} user={userData?.data} />
              )}
              {tab === "settings" && (
                <Profile
                  refetch={refetch}
                  setTab={setTab}
                  user={userData?.data}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
