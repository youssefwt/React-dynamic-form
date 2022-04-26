import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";

function App() {
  // const [username, setUsername] = useState("");
  /**if have many inputs, better make:
   1- values object, holding stats of inputs*/
  const [values, setValues] = useState({
    username: "",
    email: "",
    date: "",
    password: "",
    confirmPassword: "",
  });

  //2- and array of input objects, with every input data
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "User name should be 3-16 characters, shouldn't contain special charachters",
      label: "Username",
      required: "1",
      rules: {
        required: "true",
        pattern: "^[A-Za-z0-9]{3,16}$",
      },
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "NOT a valid email addres",
      label: "Email",
      required: "1",
      rules: {
        required: "true",
        pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
      },
    },
    {
      id: 3,
      name: "date",
      type: "date",
      placeholder: "Date",
      errorMessage: "",
      label: "Date",
      required: "1",
      rules: {
        required: "true",
        pattern: "^d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
      },
    },
    {
      id: 4,
      name: "password",
      type: "text",
      placeholder: "Password",
      errorMessage: "password should be 6-8 charachters",
      label: "Password",
      required: "1",
      rules: {
        required: "true",
        pattern: "^[A-Za-z0-9]{6,8}$",
      },
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "text",
      placeholder: "Confirm Password",
      errorMessage: " password must match",
      label: "Confirm Password",
      required: "1",
      rules: {
        required: "true",
        pattern: `^${values.password}$`,
      },
    },
  ];

  /**
   * const valuesObjectPropertyValueOfKey = values[inputs[0].name];----> value of user name property in the firs t input
   * bracket notation to acces the value of the key "name" in the input object, which translates to the property name in the values object
   * "computed property"
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    const entriesKeyArray = Object.keys(entries);
    const entriesValueArray = Object.values(entries);
    const requiredEntries = [];
    let check = true;

    entriesKeyArray.forEach((input, index) => {
      if (inputs[index].rules.required === "true")
        requiredEntries.push(entriesValueArray[index]);
    });

    if (requiredEntries.every((value) => value)) {
      console.log("required Entries ", requiredEntries);

      requiredEntries.forEach((entry, index) => {
        console.log(entry);
        entry.match(inputs[index].rules.pattern)
          ? (check = true)
          : (check = false);
      });

      if (check) {
        console.log("success");
      } else {
        console.log("something is wrong");
      }
    }
  };

  const setEntries = (e) => {
    /** "["e.target.name"]", computed property, to access property name, and assign the vlaue to it */
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            /**
            name={input.name}
            placeholder={input.placeholder}
            NOTE: since att. names are same as property names on input, you can destruct all at once*/
            {...input}
            /**bracket notation */
            value={values[input.name]}
            setEntries={setEntries}
          ></FormInput>
        ))}
        <button>submit</button>
      </form>
    </div>
  );
}

export default App;
