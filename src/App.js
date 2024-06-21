import RegisterLoginForm from "./components/registerLoginForm";
import LandingPage from "./components/landingPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "./features/account/accountSlice";

function App() {
  const dispatch = useDispatch();
  const { loggedInAccount } = useSelector((store) => store.login);
  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch])
  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
  }
  return (
    <>
      { !isObjectEmpty(loggedInAccount) ? (<LandingPage />) : (<RegisterLoginForm />) }
    </>
  );
}

export default App;
