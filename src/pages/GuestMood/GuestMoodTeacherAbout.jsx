/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
const GuestMoodTeacherAbout = ({
  qualifications,
  teaching_area,
  training_experience,
  award,
}) => {
  return (
    <div className="lg:h-screen">
      <div className="mt-12">
        {qualifications && (
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
            Academic Qualification:
          </h3>
        )}
        {qualifications?.map((item, index) => (
          <ul key={index} className="pt-4 md:p-5">
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-textColor text-[16px] leading-6 font-medium">
                  {item.degree}
                </span>
              </div>
              <span className="text-irisBlueColor text-[14px] leading-5 font-medium">
                {item.institute}
              </span>
            </li>
          </ul>
        ))}
      </div>
      {teaching_area && (
        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
            Teaching Area:
          </h3>
          <ul className="pt-4 md:p-5">
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-textColor text-[16px] leading-6 font-medium">
                  {teaching_area}
                </span>
              </div>
            </li>
          </ul>
        </div>
      )}
      {training_experience && (
        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
            Training Experience:
          </h3>
          <ul className="pt-4 md:p-5">
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-textColor text-[16px] leading-6 font-medium">
                  {training_experience}
                </span>
              </div>
            </li>
          </ul>
        </div>
      )}

      {award && (
        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
            Award & Scholarship:
          </h3>
          <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
            <li className="p-4 rounded bg-[#fff9ea]">
              <span className="text-textColor text-[15px] leading-6 font-semibold">
                {award}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GuestMoodTeacherAbout;
