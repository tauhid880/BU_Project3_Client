import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
// import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Tabs from "./Tabs";
import { useState } from "react";
import TeacherAbout from "../../pages/Teachers/TeacherAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";
import { useQuery } from "@tanstack/react-query";
const Dashboard = () => {
  const [tab, setTab] = useState("overview");
  // const { data, loading, error } = useGetProfile(
  //   `${BASE_URL}/teachers/profile/me`
  // );

  const {
    data: teachers = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["Teachers"],
    // Ensure you pass an object as the second argument
    queryFn: async () => {
      // const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/teachers/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  console.log(teachers.data?.appointments);
  return (
    <section className="lg:overflow-hidden overflow-scroll min-h-[400px]">
      <div className="lg:w-[1170px] px-5 mx-auto">
        {isLoading && !error && <Loader />}
        {error && !isLoading && <Error />}

        {!isLoading && !error && (
          <div className="lg:grid lg:grid-cols-3 grid-flow-row gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} teacherData={teachers?.data} />
            <div className="lg:col-span-2">
              {teachers?.data?.isApproved == "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    aria-hidden={true}
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We&apos;ll
                    review manually and approved by Admin
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div className="">
                    <div className="lg:flex lg:items-center gap-8 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={teachers?.data?.photo}
                          className="w-full shadow-md  shadow-slate-400"
                          alt=""
                        />
                      </figure>
                      <div>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mb-3 ">
                          {teachers?.data?.name}
                        </h3>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {teachers?.data?.designation}
                        </span>
                      </div>
                    </div>
                    <TeacherAbout
                      qualifications={teachers?.data?.qualifications}
                      experiences={teachers?.data?.experiences}
                      teaching_area={teachers?.data?.teaching_area}
                      training_experience={teachers?.data?.training_experience}
                      award={teachers?.data?.award}
                    />
                  </div>
                )}
                {tab === "appointments" && (
                  <Appointments
                    appointments={teachers?.data?.appointments}
                    refetch={refetch}
                  />
                )}
                {tab === "settings" && (
                  <Profile setTab={setTab} teacherData={teachers?.data} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
