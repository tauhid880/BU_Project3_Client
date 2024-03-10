// import { useEffect, useState } from "react";
// import TeachersCard from "../../components/Teachers/TeachersCard";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import GuestMoodTeachersCard from "./GuestMoodTeachersCard";

const GuestMoodTeachers = () => {
  const { role, user } = useContext(authContext);
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: teachers,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/teachers?query=${debounceQuery}`);

  return (
    <>
      <section className="bg-[#fff9ea96]">
        {user?._id == null ||
        !role === "teacher" ||
        !role === "admin" ||
        !role === "student" ? (
          <p className="mb-8 font-bold text-[16px] text-center uppercase leading-6 tracking-wider text-red-500">
            Please Log In for book your Appointment
          </p>
        ) : (
          ""
        )}
        <div className="container text-center">
          <h2 className="heading">Find a Teacher</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Teacher"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="btn mt-0 rounded-[0px] rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="container">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {teachers.map((teacher) => (
              <GuestMoodTeachersCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default GuestMoodTeachers;
