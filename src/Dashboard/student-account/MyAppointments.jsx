/* eslint-disable react/prop-types */
// import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import UserAppointmentCard from "../../components/UserAppointmentCard/UserAppointmentCard";
import { useQuery } from "@tanstack/react-query";

const MyAppointments = ({ user }) => {
  const { email } = user;
  const {
    data: appointments = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["appointments"],

    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/users/appointments/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const { data: pendingAppointments = [] } = useQuery({
    queryKey: ["pendingAppointments"],

    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/bookings/${email}`);
      console.log(email);
      const data = await res.json();
      return data;
    },
  });

  const pendingData = pendingAppointments?.pendingCount?.map((el) => el?.count);

  return (
    <div>
      {isLoading && !error && <Loading />}
      {error && !isLoading && <Error errMessage={error} />}
      {pendingData?.length === 0 ? (
        ""
      ) : (
        <p className=" py-5 lg:text-nowrap text-center font-medium lg:text-[16px] leading-6 tracking-tight">
          You have{" "}
          <span className="text-red-500 font-bold lg:text-[24px]">
            {pendingData}
          </span>{" "}
          {pendingData > 1 ? "appointments" : "appointment"} for approval.
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3">
          {appointments.data?.map((data) => (
            <UserAppointmentCard data={data} refetch={refetch} key={data._id} />
          ))}
        </div>
      )}

      {appointments?.data?.length === 0 && pendingData?.length === 0 && (
        <div className="flex justify-center items-center">
          <h2 className="lg:mt-28 text-center text-primaryColor leading-7 text-[20px] font-semibold">
            You did not set any appointment!
          </h2>
        </div>
      )}
      {/* {!isLoading && !error && appointments.data?.length === 0 && (
      <div className="flex justify-center items-center">
        <h2 className="lg:mt-28 text-center text-primaryColor leading-7 text-[20px] font-semibold">
          You did not set any appointment!
        </h2>
      </div>
    )} */}
    </div>
  );
};

export default MyAppointments;
