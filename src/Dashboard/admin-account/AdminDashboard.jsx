import AdminTabs from "./AdminTabs";
// import Loader from "../../components/Loader/Loading";
// import Error from "../../components/Error/Error";

import { useState } from "react";
import AllTeachers from "./AllTeachers";
import AllUsers from "./AllUsers";
import AllAppointments from "./AllAppointments";

const AdminDashboard = () => {
  const [tab, setTab] = useState("teachers");

  return (
    <section className="py-8 lg:overflow-hidden overflow-scroll">
      <div className="  h-[650px] lg:h-full px-5">
        <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
          <AdminTabs tab={tab} setTab={setTab} />

          <div className="lg:col-span-2 ">
            <div>
              {tab === "teachers" && <AllTeachers />}
              {tab === "users" && <AllUsers />}
              {tab === "appointments" && <AllAppointments />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
