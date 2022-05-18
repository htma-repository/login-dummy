import React, { useState, useEffect, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "./Input";
import AuthContext from "../Context/auth-context";

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    emailState,
    passwordState,
    dispatchEmail,
    dispatchPassword,
    onLogin,
  } = useContext(AuthContext);

  // console.log(`emailState => ${emailState.value}`);
  // console.log(`passwordState => ${passwordState.value.length}`);

  // const { isValid: emailStateValid } = emailState;
  // const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const formIdentifier = setTimeout(() => {
      // setFormIsValid(emailStateValid && passwordIsValid);
      setFormIsValid(emailState.isValid && passwordState.isValid);
      console.log("CHECKING_VALIDITY");
    }, 1000);

    return () => {
      console.log("CLEANUP");
      clearTimeout(formIdentifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "INPUT_EMAIL", payload: e.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({
      type: "INPUT_PASSWORD",
      payload: e.target.value,
    });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_PASS_BLUR" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(emailState.value, passwordState.value, emailState.isValid);
    dispatchEmail({ type: "INPUT_EMAIL", payload: "" });
    dispatchPassword({ type: "INPUT_PASSWORD", payload: "" });
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type={"email"}
          id={"E-mail"}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
          onState={emailState}
        />
        <Input
          type={"password"}
          id={"Password"}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          value={passwordState.value}
          onState={passwordState}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
