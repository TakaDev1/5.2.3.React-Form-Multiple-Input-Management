import { useState } from "react";

const usePasswordValidation = () => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPassword(value);
    if (value.length < 8) {
      setMessage("短すぎます");
    } else if (value.length < 16) {
      setMessage("良い長さです");
    } else {
      setMessage("長すぎます");
    }
  };

  return { password, message, handlePassword };
};

export default usePasswordValidation;
