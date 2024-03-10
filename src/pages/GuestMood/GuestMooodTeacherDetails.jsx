// import SidePanel from "./SidePanel";
// import TeacherAbout from "./TeacherAbout";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import GuestMoodTeacherAbout from "./GuestMoodTeacherAbout";
const GuestMooodTeacherDetails = () => {
  const { id } = useParams();

  const { data, loading, error } = useGetProfile(`${BASE_URL}/teachers/${id}`);

  return (
    <section>
      <div className="max-w-[1170px]  px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex flex-col lg:flex-row md:flex-row items-center gap-5 ">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={data.photo} alt="" className="w-full " />
                </figure>
                <div>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {data.name}
                  </h3>
                  <div className="py-3">
                    <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                      {data.designation}
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex flex-col  gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 text-headingColor">
                      <h2>
                        <span className="font-bold text-[16px] ">
                          Faculty ID :
                        </span>{" "}
                        {data.id}
                      </h2>
                      <h2>
                        {" "}
                        <span className="font-bold text-[16px] ">
                          Department :
                        </span>{" "}
                        Computer Science & Engineering
                      </h2>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
                  About of{" "}
                  <span className="text-irisBlueColor font-bold text-[24px] leading-9">
                    {data.name}
                  </span>
                </h3>
              </div>

              <div className="mt-[50px]">
                <GuestMoodTeacherAbout
                  qualifications={data.qualifications}
                  experiences={data.experiences}
                  teaching_area={data.teaching_area}
                  training_experience={data.training_experience}
                  award={data.award}
                />
              </div>
            </div>
            {/* side panel */}
            {/* {id && (
              <div>
                <SidePanel teacherData={data} />
              </div>
            )} */}
          </div>
        )}
      </div>
    </section>
  );
};

export default GuestMooodTeacherDetails;
