import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useEffect, useRef, useContext } from "react";
import { authContext } from "../../context/AuthContext.jsx";
import useFetchData from "../../hooks/useFetchData.jsx";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/teachers",
    display: "Find a Teacher",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const { fetchData } = useFetchData();

  // Modify the navLinks array based on the user's role
  const modifiedNavLinks = navLinks.map((link) => {
    if (
      (role === "admin" || role === "teacher") &&
      link.display === "Find a Teacher"
    ) {
      return { ...link, display: "Find Teachers", path: "/teachersinfo" };
    }
    return link;
  });

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const handleRefetch = () => {
    fetchData();
  };

  return (
    <header className="header flex items-center py-2" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ========== Logo ========== */}
          <div>
            <Link to="/">
              <img className="w-[180px] lg:w-72" src={logo} alt="" />
            </Link>
          </div>
          {/* =========== Menu =========== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem] ">
              {modifiedNavLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                    to={link.path}
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* ========== nav right ========= */}
          <div className="flex items-center gap-4">
            {/* token && user?  */}
            {token && user ? (
              <div>
                <Link
                  onClick={handleRefetch}
                  to={`${
                    role === "teacher"
                      ? "/teachers/profile/me"
                      : role === "admin"
                      ? "/admin/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[55px] h-[55px] rounded-full cursor-pointer">
                    <img
                      className="w-full rounded-full"
                      src={user?.photo}
                      alt=""
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Log In
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer"></BiMenu>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
