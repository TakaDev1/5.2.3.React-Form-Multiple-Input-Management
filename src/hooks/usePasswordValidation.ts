import { useState } from "react";

const usePasswordValidation = () => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleValidationMeesage = () => {
    if (password.length < 8) {
      setMessage("短すぎます");
    } else if (password.length < 16) {
      setMessage("良い長さです");
    } else {
      setMessage("長すぎます");
    }
  };

  return { password, message, handlePassword, handleValidationMeesage };
};

export default usePasswordValidation;
