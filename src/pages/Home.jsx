import { Link } from "react-router-dom";
import heroImg01 from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpeg";
import heroImg03 from "../assets/images/hero-img03.jpg";
import icon01 from "../assets/images/icon01 (1).png";
import icon02 from "../assets/images/icon03.png";
import icon03 from "../assets/images/teachers (1).png";
import icon04 from "../assets/images/students (1).png";
import faqImg from "../assets/images/faq.png";
// import icon03 from "../assets/images/icon03.png";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import FaqList from "../components/Faq/FaqList";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
const Home = () => {
  const { role, user } = useContext(authContext);
  return (
    <>
      {/* ========= Hero section ======== */}
      <>
        <section className="hero__section pt-[60px] 2xl:h-[880px]">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              {/* ======= hero content ====== */}
              <div>
                <div className="lg:w-[570px]">
                  <h1 className="text-[26px] leading-[26px] text-headingColor font-[600] md:text-[60px] md:leading-[70px] text-nowrap">
                    Welcome to Teacher
                  </h1>
                  <span className="text-red-400 text-[26px] leading-[26px] font-[600] md:text-[60px] md:leading-[70px]">
                    appointment management system
                  </span>
                  <p className="text_para">
                    Bangladesh University (BU) started its journey in 2001.
                    Since then it has been providing quality higher education at
                    a minimum cost especially for the financially
                    underprivileged. For more than a decade, BU has been
                    increasing and nurturing talent within the youth with modern
                    knowledge and technology.
                  </p>
                  {(user === null || role === "student") && (
                    <Link to="/teachers">
                      <button className="btn">Request an Appointment</button>
                    </Link>
                  )}
                  {role === "teacher" && (
                    <Link to="/pendingappointments">
                      <button className="btn">Pending Appointments</button>
                    </Link>
                  )}
                  {role === "admin" && (
                    <Link to="/allappointments">
                      <button className="btn">Appointments</button>
                    </Link>
                  )}
                </div>

                {/* ====== hero counter ======= */}
                <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-[30px]">
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      22+
                    </h2>
                    <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                    <p className="text_para">Years educational institute</p>
                  </div>
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      6500+
                    </h2>
                    <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                    <p className="text_para">Students on campus</p>
                  </div>
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      30+
                    </h2>
                    <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                    <p className="text_para">Teachers</p>
                  </div>
                </div>
              </div>
              {/* ======== hero counter end  */}

              {/* ======= Hero content ========= */}
              <div className="flex gap-[30px] justify-end">
                <div className="mt-[50px] lg:mt-[50px]">
                  <img className="rounded-lg w-full" src={heroImg01} alt="" />
                </div>
                <div className="flex flex-col">
                  <img
                    className="rounded-lg w-full mb-[30px]"
                    src={heroImg02}
                    alt=""
                  />
                  <img
                    className="rounded-lg w-full mb-[30px]"
                    src={heroImg03}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      {/* Hero content section end */}

      {/* About section start */}

      <About></About>

      {/* About section end */}
      {/* How it work section */}
      <section>
        <div className="container">
          <div className="mx-auto">
            {role === "student" || user == null ? (
              <h2 className="heading text-center lg:text-nowrap">
                Book your required appointment
              </h2>
            ) : (
              ""
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mt-[30px]  justify-items-center content-center ">
            {role == "student" || role == "teacher" || user == null ? (
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon01} alt="" />
                </div>

                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Teachers Info
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Want&apos;s to know more about your beloved teachers?
                  </p>

                  <Link
                    to={user == null ? "/guestmoodteachers" : "/teachersinfo"}
                    className="w-[44px] h-[44px] rounded-full border-2 border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="w-6 h-6 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon04} alt="" />
                </div>

                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Students
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Want&apos;s to See all students?
                  </p>

                  <Link
                    to="/allstudents"
                    className="w-[44px] h-[44px] rounded-full border-2 border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="w-6 h-6 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            )}

            {(user == null || role === "student") && (
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon02} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Book an appointment
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Are you booked your desired appointment?
                  </p>
                  <Link
                    to="/teachers"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="w-6 h-6 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            )}

            {role === "admin" && (
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon03} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Teachers
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Want&apos;s to See all teachers?
                  </p>
                  <Link
                    to="/allteachers"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="w-6 h-6 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            )}

            {role === "teacher" && (
              <div className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={icon02} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Approved appointments
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Want&apos;s to See all approved appointments?
                  </p>
                  <Link
                    to="/appointments"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="w-6 h-6 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            )}

            {/* <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find Teacher
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Consequatur, quas!
                </p>
                <Link
                  to="/teachers"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowUpRightCircle className="w-6 h-6 group-hover:text-white" />
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* How it work section end */}

      {/* Faq section start */}
      {role == "admin" || role == "teacher" ? (
        ""
      ) : (
        <section>
          <div className="container">
            <div className="flex justify-between gap-[50px] lg:gap-[50px]">
              <div className="w-1/2 hidden md:flex md:items-center">
                <img src={faqImg} alt="" />
              </div>
              <div className="md:w-1/2 w-full">
                <h2 className="heading">Frequently asked questions</h2>
                <FaqList />
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Faq section end */}
    </>
  );
};

export default Home;
