/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ teacherData, setTab }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    photo: "",
    designation: "",
    teaching_area: "",
    qualifications: [],
    training_experience: "",
    award: "",
    timeslots: [],
  });

  useEffect(() => {
    setFormData({
      name: teacherData?.name,
      email: teacherData?.email,
      phone: teacherData?.phone,
      photo: teacherData?.photo,
      designation: teacherData?.designation,
      teaching_area: teacherData?.teaching_area,
      qualifications: teacherData?.qualifications,
      training_experience: teacherData?.training_experience,
      award: teacherData?.award,
      timeslots: teacherData?.timeslots,
    });
  }, [teacherData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/teachers/${teacherData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
      setTab("overview");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReusableInputChangeFunc = (key, index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  // Reusable function for adding item

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  // Reusable function for deleting item

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQulification = (e) => {
    e.preventDefault();
    addItem("qualifications", { degree: "", institute: "" });
  };
  const handleQulificationChange = (e, index) => {
    handleReusableInputChangeFunc("qualifications", index, e);
  };

  const deleteQulification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const handleTimeSlotsChange = (e, index) => {
    handleReusableInputChangeFunc("timeslots", index, e);
  };

  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem("timeslots", index);
  };

  const addTimeSlots = (e) => {
    e.preventDefault();
    addItem("timeslots", { day: "", time: "" });
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5 ">
          <p className="form_label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input "
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="form_input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <div>
            <p className="form_label">Designation*</p>
            <select
              className="form_input py-3.5"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Associate Professor & Chairman">
                Associate Professor & Chairman
              </option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor & Department Coordinator">
                Assistant Professor & Department Coordinator
              </option>
              <option value="Senior Lecturer & Coordinator">
                Senior Lecturer & Coordinator
              </option>
              <option value="Assistant Professor & Semester program Coordinator">
                Assistant Professor & Semester program Coordinator
              </option>
              <option value="Senior Lecturer">Senior Lecturer</option>
              <option value="Lecturer">Lecturer</option>
            </select>
          </div>
        </div>
        <div className="mb-5">
          <p className="form_label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Teaching Area*</p>
          <input
            type="text"
            name="teaching_area"
            value={formData.teaching_area}
            onChange={handleInputChange}
            placeholder="Teaching Area"
            className="form_input"
            maxLength={300}
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Training Experience*</p>
          <input
            type="text"
            name="training_experience"
            value={formData.training_experience}
            onChange={handleInputChange}
            placeholder="Training Experience"
            className="form_input"
            maxLength={300}
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Award & Scholarship*</p>
          <input
            type="text"
            name="award"
            value={formData.award}
            onChange={handleInputChange}
            placeholder="Award & Scholarship"
            className="form_input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Academic Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div className="flex items-center gap-5 p-2 lg:p-0" key={index}>
              <div className="grid grid-cols-2 gap-5 mb-[30px]">
                <div>
                  <p className="form_label">Degree*</p>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={(e) => handleQulificationChange(e, index)}
                    className="form_input py-3.5"
                  >
                    <option value="">Select</option>
                    <option value="Bachelor of Sciences">
                      Bachelor of Sciences
                    </option>
                    <option value="Master of Science">Master of Science</option>
                    <option value="Doctor of Philosophy (PHD)">
                      Doctor of Philosophy (PHD)
                    </option>
                  </select>
                </div>
                <div>
                  <p className="form_label">Institute*</p>

                  <input
                    type="text"
                    name="institute"
                    value={formData.institute}
                    onChange={(e) => handleQulificationChange(e, index)}
                    placeholder="Institute"
                    className="form_input"
                    maxLength={100}
                  />
                </div>
              </div>
              <button
                onClick={(e) => deleteQulification(e, index)}
                className="bg-red-500 p-2 rounded-full text-white text-[18px]"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addQulification}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="form_label">Time Slots*</p>
          {formData.timeslots?.map((item, index) => (
            <div className="flex items-center gap-5 p-2 lg:p-0" key={index}>
              <div className="grid grid-cols-2 gap-5 mb-[30px]">
                <div>
                  <p className="form_label">Day*</p>
                  <select
                    name="day"
                    value={formData.day}
                    onChange={(e) => handleTimeSlotsChange(e, index)}
                    className="form_input py-3.5"
                  >
                    <option value="">Select</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                  </select>
                </div>
                <div>
                  <p className="form_label">Time*</p>

                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={(e) => handleTimeSlotsChange(e, index)}
                    placeholder="Ex: 10:30 AM - 11:00 AM"
                    className="form_input"
                    maxLength={100}
                  />
                </div>
              </div>
              <button
                onClick={(e) => deleteTimeSlots(e, index)}
                className="bg-red-500 p-2 rounded-full text-white text-[18px]"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addTimeSlots}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add TimeSlot
          </button>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure
              className="w-[60px] rounded-full border-2
                border-solid border-primaryColor flex items-center justify-between"
            >
              <img
                src={formData.photo}
                className="w-full rounded-full"
                alt=""
              />
            </figure>
          )}
          <div className="relative w-[160px] h-[50px] my-10">
            <input
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png, .jpeg"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[2rem] py-[0.75rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
