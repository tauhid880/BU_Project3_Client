/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { authContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const SidePanel = ({ teacherData }) => {
  const { role, user } = useContext(authContext);
  const { _id, timeslots, name, email, photo, designation } = teacherData;
  // const { id } = useParams();

  // const {
  //   data: teacherData,
  //   loading,
  //   error,
  // } = useGetProfile(`${BASE_URL}/teachers/${id}`);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    teacherName: name,
    teacherEmail: email,
    teacherId: _id,
    userId: user?._id,
    userEmail: user?.email,
    userName: user?.name,
    teacherPhoto: photo,
    timeslots: [],
    designation,
    batch: "",
    userPhoto: user?.photo,
  });

  // console.log(formData);
  useEffect(() => {
    setFormData({
      teacherName: name,
      teacherEmail: email,
      teacherId: _id,
      userId: user?._id,
      userEmail: user?.email,
      userName: user?.name,
      teacherPhoto: photo,
      timeslots: { time: "", day: "" },
      designation,
      userPhoto: user?.photo,
      batch: "",
    });
  }, [teacherData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitBookingHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/bookings/booking-checkout/${_id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="28"
      height="28"
      viewBox="0 0 50 50"
      fill="#ffff"
    >
      <path d="M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z"></path>
    </svg>
  );
  return (
    <div className=" p-3 lg:p-5 rounded-md ">
      <div>
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots
        </p>
        <ul className="mt-3">
          {timeslots?.map((item, index) => (
            <li key={index} className="flex items-center  justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[14px] leading-6 text-textColor font-semibold">
                {item.time}
              </p>
            </li>
          ))}
        </ul>
        {user?._id == null ||
        role === "teacher" ||
        role === "admin" ||
        timeslots?.length === 0 ? (
          ""
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="btn px-2 lg:w-1/4  rounded-md bg-sky-500/95 hover:bg-primaryColor/90"
          >
            Book Appointment
          </button>
        )}
        {!user?._id && (
          <p className="mt-8 font-bold text-[16px] text-center uppercase leading-6 tracking-wider text-red-500">
            Please Log In for book your Appointment
          </p>
        )}
        <Modal
          open={open}
          center
          closeIcon={closeIcon}
          onClose={() => setOpen(false)}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
        >
          <form onSubmit={submitBookingHandler} className="p-7">
            <div className="mb-5">
              <p className="form_label text-[20px] text-white mb-3">Day*</p>
              <select
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                className="form_input py-2.5"
              >
                <option value="">Select</option>
                {timeslots?.map((item, index) => (
                  <option className="uppercase" key={index} value={item.day}>
                    {item.day}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <p className="form_label text-[20px] text-white mb-3">Time*</p>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="form_input py-2.5"
              >
                <option value="">Select</option>
                {timeslots?.map((item, index) => (
                  <option key={index} value={item.time}>
                    {item.time}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <p className="form_label text-[20px] text-white mb-3">Batch*</p>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                className="form_input py-2.5"
                placeholder="Your Batch"
              />
            </div>
            <div className="mt-7 flex justify-center">
              <button
                type="submit"
                className="bg-primaryColor text-white text-[18px] leading-[30px] w-1/2 py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default SidePanel;
