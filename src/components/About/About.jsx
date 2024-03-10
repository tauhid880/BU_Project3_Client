import aboutImg from "../../assets/images/about.jpg";
import card from "../../assets/images/card.jpg";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* ====== about image ======== */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img className="rounded-lg" src={aboutImg} alt="" />
            <div className="absolute z-20 lg:bottom-4 bottom-[-50px] w-[200px] md:w-[300px]  lg:right-[18%] md:right-[-7%] right-[-30%] lg:p-5 p-2">
              <img className="rounded-lg" src={card} alt="" />
            </div>
          </div>
          {/* end */}
          {/* about content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Message from Head</h2>
            <p className="text_para">
              I would like to extend my warmest welcome to you as the Head to
              the Department of Computer Science and Engineering at the
              Bangladesh University. Computing has revolutionized our world as
              we know it in the past two decades and will continue to serve as
              the core of all technologies in the 21st century. To prepare the
              future leaders for these innovations, I am proud to be the Head of
              a department which offers B.Sc. degree programs in Computer
              Science & Engineering. The Department of Computer Science at
              Bangladesh University provides a comprehensive education that
              equips our graduates with the technical skills, expert knowledge
              and professional ethics that are necessary to participate and play
              leadership roles in the digital revolution.
            </p>
          </div>
          {/* about content end */}
        </div>
      </div>
    </section>
  );
};

export default About;

// {/* <img className="w-[30px]" src={dot} alt="" /> */}

{
  /* <h1 className="font-bold lg:text-[30px] md:text-[30px]">
Md. Sadiq Iqbal
</h1>
<p className="font-medium lg:text-[14px] text-slate-800 leading-tight text-nowrap">
Associate Professor & Chairman
</p>
<p className="text-nowrap">Computer Science & Engineering</p> */
}
{
  /* <div className="absolute z-20 lg:bottom-5 bottom-[-40px] md:bottom-14 lg:w-[280px] w-[105%] md:w-[300px] bg-orange-50 lg:right-[22%] md:right-[-90px] right-[-90px] lg:p-5 p-2">
                
            </div> */
}
