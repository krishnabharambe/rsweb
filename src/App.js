import ValidatePhone from "./Components/Auth/ValidatePhone";
import * as actions from './Redux/Actions/Auth';
import { connect, useDispatch } from 'react-redux';
import MainPage from "./Containers/MainPage";
import { useEffect } from "react";
function App() {


  const dispatch = useDispatch();
  
  useEffect(() => {
    actions.checkifAuth(dispatch);
  },[]);

  return (
    <div>
      <MainPage/>
    </div>
  );
}

export default (App);
