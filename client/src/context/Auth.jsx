import { useState, useContext, createContext, useEffect } from "react";
// initializing createContext
const AuthContext = createContext();

const AuthProvider = (props) => {
  // initializing the data that is to be used all over the app
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // using useeffect to grab login data from local and to keep the data

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({ ...auth, user: parseData.user, token: parseData.token });
    }
  }, []);

  // axios defaults
  // axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

// custom hook to be used anywhere

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
