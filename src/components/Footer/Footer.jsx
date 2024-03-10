// import logo from "../../assets/images/logo.png";
// import { RiLinksFill } from "react-icons/ri";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    path: "/",
    icon: <AiFillFacebook className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "/",
    icon: <AiFillInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "/",
    icon: <AiFillLinkedin className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/teachers",
    display: "Find a Teacher",
  },
  {
    path: "/",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer pb-2 pt-2">
      <div className="container">
        <div className="flex justify-between  flex-col md:flex-row flex-wrap gap-[30px]">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:gap-11">
            {/* <img className="w-[180px] lg:w-72" src={logo} alt="" /> */}
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright &#169; {year} developed by Tauhid Islam
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  to={link.path}
                  key={index}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-3 text-headingColor ">
              Quick Links
            </h2>
            <ul className="flex justify-between items-center gap-1 lg:gap-[10px] md:gap-[8px]">
              {quickLinks.map((item, index) => (
                <li key={index} className="">
                  <Link
                    className="text-[16px] leading-7 font-[500] text-textColor hover:text-primaryColor"
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
