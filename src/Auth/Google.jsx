import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleSignApi } from "../../apiList";
import toast from "react-hot-toast";

export default function Google() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        const signInWithGoogle = async () => {
            try {
                const { data } = await axios.post(GoogleSignApi, { code });
                localStorage.setItem("authToken", data.user.authToken);
                toast.success("Signed In Successfully");
                navigate("/dashboard");
            } catch (error) {
                toast.error("Sign in failed");
                navigate("/auth");
            }
        };

        if (code) {
            signInWithGoogle();
        }
    }, [code, navigate]);

    return (
        <div className="text-center mt-4">
            Please wait while we sign you in...
        </div>
    );
}