import FadeLoader from "react-spinners/FadeLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <FadeLoader color="#0067FF" />
    </div>
  );
};

export default Loading;
