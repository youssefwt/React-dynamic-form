import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";

function App() {
  // const [username, setUsername] = useState("");
  /**if have many inputs, better make:
   1- values object, holding stats of inputs*/
  const [values, setValues] = useState({
    username: "",
    fullname: "",
    email: "",
    date: "",
    password: "",
    confirmPassword: "",
  });

  //2- and array of input objects, with every input data, same as HTML attributes
  const inputs = [
    {
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
      name: "fullname",
      type: "text",
      placeholder: "fullname",
      errorMessage: "any message you want",
      label: "fullname",
      required: "",
      rules: {
        required: "false",
        pattern: "^[A-Za-z0-9\\s]{3,16}$",
      },
    },
    {
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
      name: "date",
      type: "date",
      placeholder: "Date",
      errorMessage: "",
      label: "Date",
      required: "1",
      rules: {
        required: "true",
        pattern: "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))",
      },
    },
    {
      name: "password",
      type: "password",
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
      name: "confirmPassword",
      type: "password",
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
    const requiredEntriesPattern = [];
    let error = 0;

    entriesKeyArray.forEach((input, index) => {
      if (inputs[index].rules.required === "true") {
        requiredEntries.push(entriesValueArray[index]);
        requiredEntriesPattern.push(inputs[index].rules.pattern);
      } else {
        return; //to skip the iteration
      }
    });

    if (requiredEntries.every((value) => value)) {
      console.log("required Entries: ", requiredEntries);

      requiredEntries.forEach((entry, index) => {
        console.log("entry ", entry);
        console.log("index ", index);
        console.log("pattern ", requiredEntriesPattern[index]);
        if (!entry.match(requiredEntriesPattern[index])) error++;

        console.log("check: ", error);
      });

      if (!error) {
        //send to API
        alert("success");
      } else {
        alert("fail, please conform to the requirments");
      }
    }
  };

  const setEntries = (e) => {
    /** "["e.target.name"]", computed property, to access property name, and assign the vlaue to it */
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {inputs.map((input, index) => (
          <FormInput
            key={index}
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
