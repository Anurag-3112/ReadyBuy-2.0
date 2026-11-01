import Razorpay from "razorpay";
import AppError from "../shared/errors/AppError.js";
import config from "./env.js";

let razorpayClient = null;

const getRazorpayClient = () => {
    if (!config.razorpay.keyId || !config.razorpay.keySecret) {
        throw new AppError("Razorpay is not configured", 500);
    }

    if (!razorpayClient) {
        razorpayClient = new Razorpay({
            key_id: config.razorpay.keyId,
            key_secret: config.razorpay.keySecret,
        });
    }

    return razorpayClient;
};

export default getRazorpayClient;