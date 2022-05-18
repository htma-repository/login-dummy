import { createContext, useEffect, useState, useReducer } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  emailState: {
    value: "",
    isValid: null,
  },
  passwordState: {
    value: "",
    isValid: null,
  },
  dispatchEmail: {},
  dispatchPassword: {},
});

const emailPassReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_EMAIL":
      return { value: action.payload, isValid: action.payload.includes("@") };
    case "INPUT_EMAIL_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    case "INPUT_PASSWORD":
      return {
        value: action.payload,
        isValid: action.payload.trim().length > 6,
      };
    case "INPUT_PASS_BLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return { value: "", isValid: null };
  }
};

const initialState = {
  value: "",
  isValid: null,
};

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailState, dispatchEmail] = useReducer(
    emailPassReducer,
    initialState
  );
  const [passwordState, dispatchPassword] = useReducer(
    emailPassReducer,
    initialState
  );

  useEffect(() => {
    const localStorageInfo = localStorage.getItem("isLoggedIn");

    if (localStorageInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password, valid) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(
      "isLoggedIn",
      JSON.stringify({ email, password, valid })
    );
    setIsLoggedIn(true);
    console.log("LOGIN");
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    console.log("LOGOUT");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        emailState,
        passwordState,
        dispatchEmail,
        dispatchPassword,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
