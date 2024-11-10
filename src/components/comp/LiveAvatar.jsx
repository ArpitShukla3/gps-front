import useUserStore from "../../store";
import { Toaster } from "react-hot-toast";

export default function LiveAvatar({ name, email, result }) {
  const setActive = useUserStore((state) => state.setActive);
  const handleClick = () => {
    setActive(result);
  };
  return (
    <div
      className="w-full px-2 py-1 my-1 hover:bg-green-600 rounded-md hover:text-white transition-colors duration-300"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h1 className="font-bold text-lg group-hover:text-white">{name}</h1>
          <p className="text-sm text-gray-500 group-hover:text-white">
            {email}
          </p>
        </div>
        <div className="text-xs text-gray-400 italic font-thin self-end hover:text-white">
          {result && result.updatedAt ? `Updated at ${new Date(result.updatedAt).toLocaleString()}` : "User is offline"}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
