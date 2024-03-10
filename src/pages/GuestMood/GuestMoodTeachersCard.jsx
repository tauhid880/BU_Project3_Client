/* eslint-disable react/prop-types */
import { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const GuestMoodTeachersCard = ({ teacher }) => {
  const { name, designation, photo, id, _id } = teacher;
  const { user } = useContext(authContext);

  return (
    <div className="p-3 lg:p-5 shadow-lg rounded-md ">
      <div className="">
        <img src={photo} className="w-2/4 rounded" alt="" />
      </div>

      <div className="">
        <h2 className="text-[18px] md:text-[14px] leading-[30px] md:leading-5 lg:text-[24px] lg:leading-6 text-headingColor font-[700] mt-3 lg:mt-5">
          {name}
        </h2>
        <div className="mt-2 lg:mt-4 flex items-center justify-between">
          <span className=" bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[14px] lg:leading-6 font-semibold rounded">
            {designation}
          </span>
        </div>
      </div>

      <div className="mb-5">
        <div className="mt-[18px] md:mt-[15px] lg:mt-2 flex items-center justify-between">
          <div>
            <h3 className="text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor ">
              Faculty ID : {id}
            </h3>
          </div>
        </div>
      </div>
      <Link
        to={user == null ? `/guestmoodteachers/${_id}` : `/teacherinfo/${_id}`}
        className="w-[150px] h-[44px] text-center rounded-xl border-[1px] border-solid border-[#fbbaab]  mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none hover:text-white"
      >
        See details
        <BsArrowRight className="w-6 h-6 ml-2 group-hover:text-white" />
      </Link>
    </div>
  );
};

export default GuestMoodTeachersCard;
