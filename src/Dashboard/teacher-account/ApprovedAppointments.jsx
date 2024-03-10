import { BASE_URL, token } from "../../config";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loading";
const ApprovedAppointments = () => {
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

  console.log(teachers.data?.appointments.isApproved);
  const appointments = teachers.data?.appointments;

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

  const verifyHandle = async (_id) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${_id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved: "approved" }),
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
    <div className="h-screen p-5">
      {isLoading && !error && <Loader />}
      {error && !isLoading && <Error />}
      <table className=" w-full text-left text-sm text-gray-500 overflow-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Photo
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Batch
            </th>

            <th scope="col" className="px-6 py-3">
              Appointment on
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments &&
          appointments.filter((item) => item.isApproved === "approved").length >
            0 ? (
            // If appointments array exists and is not empty
            appointments.map(
              (item) =>
                // Add a condition to check if the item's isApproved is "pending"
                item.isApproved === "approved" && (
                  <tr key={item._id}>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      <img
                        src={item.userPhoto}
                        className="w-14 h-14 rounded-full"
                        alt=""
                      />
                    </th>
                    <th>
                      <p>{item.userName}</p>
                    </th>

                    <th className="px-6 py-4">{item.batch}</th>
                    {item.timeslot.map((el, index) => (
                      <th key={index} className="px-6 py-4">
                        {el.day} <br /> {el.time}
                      </th>
                    ))}

                    <th className="px-6 py-4 ">
                      {item.isApproved === "approved" ? (
                        <button className="border p-1 w-[100px] bg-[#FFEEEE] rounded-md  font-semibold text-black capitalize">
                          {item.isApproved}
                        </button>
                      ) : (
                        <button
                          onClick={() => verifyHandle(item._id)}
                          className="border w-[100px] p-1 bg-[#FFF5DF] rounded-md  font-semibold text-black capitalize"
                        >
                          {item.isApproved}
                        </button>
                      )}
                    </th>
                    <th className="px-6 py-4">
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="bg-red-500 p-2 rounded-full text-white text-[18px]"
                      >
                        <AiOutlineDelete />
                      </button>
                    </th>
                  </tr>
                )
            )
          ) : (
            // If appointments array is empty or doesn't exist
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedAppointments;
// {appointments?.map(
//     (item) =>
//       // Add a condition to check if the item's isApproved is "pending"
//       item.isApproved === "pending" && (
//         <tr key={item._id}>
//           <th
//             scope="row"
//             className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
//           >
//             <img
//               src={item.userPhoto}
//               className="w-14 h-14 rounded-full"
//               alt=""
//             />
//           </th>
//           <th>
//             <p>{item.userName}</p>
//           </th>

//           <th className="px-6 py-4">{item.batch}</th>
//           {item.timeslot.map((el, index) => (
//             <th key={index} className="px-6 py-4">
//               {el.day} <br /> {el.time}
//             </th>
//           ))}

//           <th className="px-6 py-4 ">
//             {item.isApproved === "approved" ? (
//               <button className="border p-1 w-[100px] bg-[#FFEEEE] rounded-md  font-semibold text-black capitalize">
//                 {item.isApproved}
//               </button>
//             ) : (
//               <button
//                 onClick={() => verifyHandle(item._id)}
//                 className="border w-[100px] p-1 bg-[#FFF5DF] rounded-md  font-semibold text-black capitalize"
//               >
//                 {item.isApproved}
//               </button>
//             )}
//           </th>
//           <th className="px-6 py-4">
//             <button
//               onClick={() => deleteHandler(item._id)}
//               className="bg-red-500 p-2 rounded-full text-white text-[18px]"
//             >
//               <AiOutlineDelete />
//             </button>
//           </th>
//         </tr>
//       )
//   )}
