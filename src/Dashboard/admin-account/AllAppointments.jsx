import { BASE_URL, token } from "../../config";
// import useAllBookings from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AllAppointments = () => {
  // const {
  //   data: bookings,
  //   loading,
  //   error,
  // } = useAllBookings(`${BASE_URL}/bookings`);

  const {
    data: bookings = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["AllBookings"],
    // Ensure you pass an object as the second argument
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/bookings`, {
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
      const res = await fetch(`${BASE_URL}/bookings/${_id}`, {
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
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="h-screen p-5">
        {isLoading && !error && <Loader />}
        {error && !isLoading && <Error />}
        <table className="w-full text-left text-sm text-gray-500 table-auto">
          <thead className="text-xs text-gray-700  bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Student Photo
              </th>
              <th scope="col" className="px-6 py-3 ">
                Teacher Photo
              </th>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Teacher Name
              </th>

              <th scope="col" className="px-6 py-3">
                Appointment on
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {bookings?.data?.map((booking) => (
              <tr className="shadow-md" key={booking._id}>
                <td
                  scope=""
                  className=" px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    src={booking.userPhoto}
                    className="w-14 h-14 rounded-full"
                    alt=""
                  />
                </td>

                <td
                  scope=""
                  className=" px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    src={booking.teacherPhoto}
                    className="w-14 h-14 rounded-full"
                    alt=""
                  />
                </td>

                <td className="px-6 py-4">{booking.userName}</td>
                <td className="px-6 py-4">{booking.teacherName}</td>
                {booking.timeslot.map((time, index) => (
                  <td key={index} className="px-6 py-4">
                    {time.day} <br /> {time.time}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteHandler(booking._id)}
                    className="bg-red-500 p-2 rounded-full text-white text-[18px]"
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllAppointments;
