/* eslint-disable react/prop-types */

const UserAppointmentCard = ({ data }) => {
  const { teacherName, designation, teacherPhoto, timeslot } = data;

  // console.log(_id);

  return (
    <div className="p-3 lg:p-5 shadow-lg rounded-md  bg-gray-100">
      <div className="">
        <img
          src={teacherPhoto}
          className="w-2/4 rounded-full shadow-lg"
          alt=""
        />
      </div>

      <div className="">
        <h2 className="text-[18px] md:text-[14px] leading-[30px] md:leading-5 lg:text-[20px] lg:leading-6 text-headingColor font-[700] mt-3 lg:mt-5">
          {teacherName}
        </h2>
        <div className="mt-2 lg:mt-4 flex items-center justify-between">
          <span className=" bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-1.5 lg:px-4 text-[12px] leading-4 lg:text-[13px] lg:leading-4 font-semibold rounded">
            {designation}
          </span>
        </div>
      </div>

      <div className="mb-5">
        {timeslot.map((time, index) => (
          <div key={index} className="mt-[18px] md:mt-[15px] lg:mt-2 ">
            <div>
              <h3 className="text-[16px] leading-7 lg:text-[16px] lg:leading-[25px] font-semibold text-headingColor ">
                <span className="text-amber-500">Appointment Time</span> <br />{" "}
                <span className="uppercase">
                  {time.day} ({time.time})
                </span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointmentCard;
