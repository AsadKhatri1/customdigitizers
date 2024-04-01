import { useState, useContext, createContext } from "react";
// initializing createContext
const SearchContext = createContext();

const SearchProvider = (props) => {
  // initializing the data that is to be used all over the app
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {props.children}
    </SearchContext.Provider>
  );
};

// custom hook to be used anywhere

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
