import React from "react";

import classes from "./Login.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.onState.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.type}>{props.id}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
