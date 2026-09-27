import React from "react";
import usePasswordValidation from "../hooks/usePasswordValidation";

const PasswordValidation = () => {
  const { password, message, handlePassword } = usePasswordValidation();

  return (
    <div>
      <label htmlFor="password">
        パスワード: <input type="password" value={password} onChange={handlePassword} />
      </label>

      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PasswordValidation;
