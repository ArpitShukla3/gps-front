import Lottie from "lottie-react";
import animationData from "../downloadedData/astronaut.json"; // Path to your Lottie JSON file

const MyComponent = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default MyComponent;
