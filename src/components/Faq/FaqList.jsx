import { faqs } from "../../assets/data/faqs";
import Faqitem from "./Faqitem";

const FaqList = () => {
  return (
    <ul className="mt-[38px]">
      {faqs.map((item, index) => (
        <Faqitem key={index} item={item}></Faqitem>
      ))}
    </ul>
  );
};

export default FaqList;
