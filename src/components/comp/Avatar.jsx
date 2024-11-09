import axios from "axios";
import { addApi } from "../../../apiList";
import useUserStore from "../../store";
import toast, { Toaster } from "react-hot-toast";

export default function Avatar({ name, email,result}) {
    const To = useUserStore((state) => state.To);
    const setTo = useUserStore((state) => state.setTo);
    const handleClick = async() => {
        if (To&& !To.includes(result)) {
            setTo([...To, result]);
        }
        else
        {
            setTo([result]);
        }
        toast.loading("Adding to your list");
        try{
            const res = await axios.post(addApi,{toId:result._id},{withCredentials:true});
            toast.dismiss();
            toast.success("Added to your list");
        }
        catch(err){
            toast.dismiss();
            toast.error("Failed to add to your list");
        }
     }
    return (
        <div className="w-full px-2 py-1 my-1 hover:bg-green-600 rounded-md hover:text-white transition-colors duration-300" onClick={handleClick}>
            <div className="flex flex-row items-center gap-2">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
                <div>
                    <h1 className="font-bold text-lg group-hover:text-white">{name}</h1>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300">{email}</p>
                </div>
            </div>
            <Toaster />
        </div>
    );
}