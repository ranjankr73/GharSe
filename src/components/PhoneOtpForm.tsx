import { useState, type ChangeEvent, type FormEvent } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [countryCode, setCountryCode] = useState<string>("+91");
    const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const isValidPhone = phoneNumber.length >= 10 && phoneNumber.length <= 15;

    const handlePhoneNumberSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!isValidPhone) {
            alert("Please enter a valid phone number");
            return;
        }

        setIsLoading(true);

        // 🔹 Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setShowOtpInput(true);
        }, 1500);
    };

    const onOtpSubmit = (otp: string) => {
        console.log("OTP:", otp);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-6">
                {!showOtpInput ? (
                    <>
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Verify Phone
                            </h2>
                            <p className="text-sm text-gray-500">
                                Enter your phone number to receive OTP
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handlePhoneNumberSubmit}
                            className="space-y-4"
                        >
                            {/* Phone Input with Country Code */}
                            <div className="flex">
                                <select
                                    value={countryCode}
                                    onChange={(e) =>
                                        setCountryCode(e.target.value)
                                    }
                                    className="
                                        px-3 py-3
                                        border border-gray-300 border-r-0
                                        rounded-l-xl
                                        bg-gray-100 text-sm
                                        outline-none
                                    "
                                >
                                    <option value="+91">+91 🇮🇳</option>
                                    <option value="+1">+1 🇺🇸</option>
                                    <option value="+44">+44 🇬🇧</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    className="
                                        flex-1 px-4 py-3
                                        border border-gray-300 rounded-r-xl
                                        text-sm
                                        outline-none
                                        focus:ring-2 focus:ring-blue-200
                                        focus:border-blue-500
                                        transition
                                    "
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={!isValidPhone || isLoading}
                                className={`
                                    w-full py-3 rounded-xl font-medium text-white transition
                                    ${
                                        isLoading || !isValidPhone
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600 active:scale-95"
                                    }
                                `}
                            >
                                {isLoading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        {/* OTP Screen */}
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Enter OTP
                            </h2>
                            <p className="text-sm text-gray-500">
                                OTP sent to{" "}
                                <span className="font-medium text-gray-700">
                                    {countryCode} {phoneNumber}
                                </span>
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                        </div>

                        <button
                            onClick={() => setShowOtpInput(false)}
                            className="w-full text-sm text-blue-500 hover:underline"
                        >
                            Change phone number
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PhoneOtpForm;