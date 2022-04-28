import { useState } from "react";
import "./forminput.css";

const FormInput = (props) => {
  const [invalid, setinvalid] = useState("false"); //default is false
  const { rules, label, errorMessage, setEntries, id, ...inputProps } = props;
  const { required, pattern } = rules;

  const verify = (e) => {
    const value = e.target.value;
    const check = `${value}`.match(pattern);

    if (required && e.target.value && !check) {
      setinvalid("true");
    } else {
      setinvalid("false");
    }
  };
  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        {...inputProps} //using destructuring
        isrequired={required}
        onChange={(e) => {
          setEntries(e);
          verify(e); //optional
        }}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setinvalid("true")
        }
        onBlur={verify}
        invalid={invalid}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
