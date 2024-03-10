/* eslint-disable react/prop-types */
// import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AdminTabs = ({ tab, setTab }) => {
  const { dispatch, user } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="lg:min-h-[600px] ">
      {/* <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span> */}
      <div className="lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md max-w-[80%] ">
        <div className="hidden lg:block pb-[50px] px-[30px] rounded-md">
          <div className="flex items-center justify-center">
            <figure className="w-[200px] h-[200px] rounded-full border-2 border-solid border-primaryColor ">
              <img
                className="w-full h-full rounded-full"
                src={user.photo}
                alt=""
              />
            </figure>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
              {user.name}
            </h3>
            <p className="text-textColor text-[15px] leading-6 font-medium">
              <span className="font-bold text-black">Email :</span> {user.email}
            </p>
            <p className="mt-2 text-textColor text-[15px] leading-6 font-medium">
              <span className="font-bold text-black">ID :</span> {user.id}
            </p>
          </div>
        </div>
        <button
          onClick={() => setTab("teachers")}
          className={`${
            tab == "teachers"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          All Teachers
        </button>
        <button
          onClick={() => setTab("users")}
          className={`${
            tab == "users"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          All Students
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={` ${
            tab == "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          All Appointments
        </button>
        <div className=" lg:mt-[100px] mt-5 w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTabs;
