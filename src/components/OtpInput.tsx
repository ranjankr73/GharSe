import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type ClipboardEvent,
} from "react";

const OtpInput = ({
    length = 4,
    onOtpSubmit = () => {},
}: {
    length: number;
    onOtpSubmit: (otp: string) => void;
}) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    console.log(inputRefs);

    // Focus on first empty or last
    const focusNext = (otpArr: string[], currentIdx: number) => {
        const nextIdx = otpArr.findIndex(
            (val, i) => i > currentIdx && val === "",
        );

        if (nextIdx !== -1) {
            inputRefs.current[nextIdx]?.focus();
        } else if (currentIdx < length - 1) {
            // If no empty, focus goes to last
            inputRefs.current[length - 1]?.focus();
        }
    };

    // Handle change while typing
    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^\d*$/;

        if (!regex.test(value)) return;

        const newOtp = [...otp];

        // Take last typed digit only
        const digit = value.slice(-1);
        newOtp[index] = digit;

        setOtp(newOtp);

        const combinedOtp = newOtp.join("");

        // Submit when fully filled
        if (combinedOtp.length === length && !newOtp.includes("")) {
            onOtpSubmit(combinedOtp);
        }

        // Move focus when current index is filled
        if (digit) {
            focusNext(newOtp, index);
        }
    };

    // Handle Keyboard action
    const handleKeyDown = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>,
    ) => {
        // Handle backspace
        if (e.key === "Backspace") {
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
                newOtp[index - 1] = "";
                setOtp(newOtp);
            }
        }

        // Handle Arrow key
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle click to prevent jumping ahead by leaving empty index
    const handleClick = (index: number) => {
        const firstEmpty = otp.findIndex((val) => val === "");

        if (firstEmpty !== -1 && firstEmpty < index) {
            inputRefs.current[firstEmpty]?.focus();
        } else {
            inputRefs.current[index]?.setSelectionRange(1, 1);
        }
    };

    // Handle paste
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedData = e.clipboardData.getData("text").trim();

        const regex = /^\d+$/;

        if (!regex.test(pastedData)) return;

        const newOtp = [...otp];

        for (let i = 0; i < length; i++) {
            newOtp[i] = pastedData[i] || "";
        }

        setOtp(newOtp);

        const lastFilledIdx = newOtp.findLastIndex((val) => val !== "");

        if (lastFilledIdx !== -1) {
            inputRefs.current[lastFilledIdx]?.focus();
        }

        if (!newOtp.includes("")) {
            onOtpSubmit(newOtp.join(""));
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg bg-white">
            <p className="text-sm text-gray-500">Enter OTP</p>
            <div className="flex gap-3">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        ref={(element) => {
                            inputRefs.current[index] = element;
                        }}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onClick={() => handleClick(index)}
                        onPaste={handlePaste}
                        className={`w-12 h-14
                    text-center text-xl font-semibold
                    rounded-xl
                    border 
                    shadow-sm
                    transition-all duration-200
                    outline-none
                    
                    ${value ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-200
                    focus:scale-105

                    hover:border-gray-400

                    disabled:bg-gray-100`}
                    />
                ))}
            </div>
        </div>
    );
};

export default OtpInput;
