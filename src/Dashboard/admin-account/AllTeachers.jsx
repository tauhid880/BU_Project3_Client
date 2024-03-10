// import useAllTeacher from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
const AllTeachers = () => {
  const {
    data: teachers = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["AllTeachers"],
    // Ensure you pass an object as the second argument
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/admin/allteachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  console.log(teachers);
  const deleteHandler = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/admin/${_id}`, {
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
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/admin/allteachers/${_id}`, {
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
    <>
      <div className="h-screen p-5 mt-10">
        {isLoading && !error && <Loading />}
        {error && !isLoading && <Error />}
        {!isLoading && !error && (
          <table className="w-full text-center text-sm text-gray-500 overflow-scroll">
            <thead className="w-1/2 text-xs text-gray-700  bg-gray-50">
              <tr>
                <th className="px-6 py-3">Photo</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>

                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers?.data?.map((teacher) => (
                <tr className="shadow-md" key={teacher._id}>
                  <th
                    scope="row"
                    className="flex justify-center items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <Link to={`/teachers/${teacher._id}`}>
                      <img
                        src={teacher.photo}
                        className="w-14 h-14 rounded-full"
                        alt=""
                      />
                    </Link>
                  </th>
                  <th>
                    <p>{teacher.name}</p>
                  </th>

                  <th className="px-6 py-4 ">
                    {teacher.isApproved === "approved" ? (
                      <button className="border p-1 w-[100px] bg-[#FFEEEE] rounded-md  font-semibold text-black capitalize">
                        {teacher.isApproved}
                      </button>
                    ) : (
                      <button
                        onClick={() => verifyHandle(teacher._id)}
                        className="border w-[100px] p-1 bg-[#FFF5DF] rounded-md  font-semibold text-black capitalize"
                      >
                        {teacher.isApproved}
                      </button>
                    )}
                  </th>
                  <th className="px-6 py-4 ">
                    <button
                      onClick={() => deleteHandler(teacher._id)}
                      className="bg-red-500 p-2 rounded-full text-white text-[18px]"
                    >
                      <AiOutlineDelete />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AllTeachers;

// fetch(`${BASE_URL}/admin/allteachers/${_id}`, {
//   method: "PUT",
//   headers: {
//     "content-type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({ isApproved: "approved" }),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     if (data.acknowledged) {
//       toast.success("verify successfull", { duration: 1200 });
//     } else {
//       toast.error(data.message, { duration: 1200 });
//     }
//   })
//   .catch((error) => {
//     toast.error(error.message, { duration: 1200 });
//   });
