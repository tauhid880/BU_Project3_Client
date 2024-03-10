import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["AllUsers"],

    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/admin/allusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  // const {
  //   data: users,
  //   loading,
  //   error,
  // } = useAllUser(`${BASE_URL}/admin/allusers`);

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
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="h-screen p-5">
        {isLoading && !error && <Loading />}
        {error && !isLoading && <Error />}
        {!isLoading && !error && (
          <table className="w-full text-center text-sm text-gray-500 table-auto overflow-x-scroll">
            <thead className="text-xs text-gray-700  bg-gray-50">
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users?.data?.map((user) => (
                <tr className="shadow-md" key={user?._id}>
                  {user.role == "admin" ? (
                    ""
                  ) : (
                    <th
                      scope="row"
                      className="flex items-center justify-center px-6 py-4 text-gray-900 whitespace-nowrap"
                    >
                      <img
                        src={user?.photo}
                        className="w-14 h-14 rounded-full"
                        alt=""
                      />
                    </th>
                  )}
                  {user.role == "admin" ? (
                    ""
                  ) : (
                    <th>
                      <p>{user.name}</p>
                    </th>
                  )}

                  {user.role == "admin" ? (
                    ""
                  ) : (
                    <th className="px-6 py-4">{user?.batch}</th>
                  )}
                  <th className="px-6 py-4">
                    {user.role == "admin" ? (
                      ""
                    ) : (
                      <button
                        onClick={() => deleteHandler(user?._id)}
                        className="bg-red-500 p-2 rounded-full text-white text-[18px]"
                      >
                        <AiOutlineDelete />
                      </button>
                    )}
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

export default AllUsers;
