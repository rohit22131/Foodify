import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  console.log(token);
  

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        toast.error("Invalid verification link");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/verify-email?token=${token}`
        );

        toast.success(response.data.message || "Email verified!");
        setVerified(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Verification failed or link expired."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {loading ? (
        <h2 className="text-xl font-semibold">Verifying your email...</h2>
      ) : verified ? (
        <div>
          <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
          <p className="mt-2 text-gray-700">Redirecting to login page...</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
          <p className="mt-2 text-gray-700">This link may be invalid or expired.</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
