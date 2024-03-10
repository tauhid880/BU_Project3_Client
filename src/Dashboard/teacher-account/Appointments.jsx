import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";

/* eslint-disable react/prop-types */
const Appointments = ({ appointments, refetch }) => {
  // const data = appointments?.map((el) => el.timeslot);
  // const time = data?.map((el) => el.time);
  // console.log(time);
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
    <table className=" text-left text-sm text-gray-500 overflow-scroll">
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
        {appointments?.map((item) => (
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
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
