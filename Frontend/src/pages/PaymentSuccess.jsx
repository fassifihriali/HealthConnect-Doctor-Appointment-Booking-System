import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const PaymentSuccess = () => {
  const { appointmentId } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/user/confirm-stripe-payment",
          { appointmentId },
          { headers: { token } }
        );
        if (data.success) {
          toast.success("Payment successful");
          navigate("/my-appointments");
        }
      } catch (error) {
        console.log(error);
      }
    };
    confirmPayment();
  }, []);

  return <div className="text-center mt-10">Payment Successful 🎉</div>;
};

export default PaymentSuccess;
