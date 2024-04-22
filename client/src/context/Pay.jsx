import { useState, useContext, createContext, useEffect } from "react";
// initializing createContext
const PayContext = createContext();

const PayProvider = (props) => {
  // initializing the data that is to be used all over the app
  const [pay, setPay] = useState(false);

  return (
    <PayContext.Provider value={[pay, setPay]}>
      {props.children}
    </PayContext.Provider>
  );
};

// custom hook to be used anywhere

const usePay = () => useContext(PayContext);

export { usePay, PayProvider };
