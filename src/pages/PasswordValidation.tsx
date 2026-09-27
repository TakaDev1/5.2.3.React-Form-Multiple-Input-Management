import React from "react";
import usePasswordValidation from "../hooks/usePasswordValidation";

const PasswordValidation = () => {
  const { password, message, handlePassword } = usePasswordValidation();

  return (
    <div>
      <label htmlFor="password" className="text-white">
        パスワード:{" "}
        <input type="password" value={password} onChange={handlePassword} className="border" />
      </label>

      <div>
        <p
          className={`${password.length < 8 ? "text-red-500" : password.length < 16 ? "text-blue-500" : "text-yellow-500"} ) {

        }}`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default PasswordValidation;
