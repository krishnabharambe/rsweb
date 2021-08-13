import React from 'react';
import { useSelector } from 'react-redux';
import AuthMainPage from './Auth/AuthMainPage';
import Home from './Services/Home';

// import { Container } from './styles';

function MainPage() {
    const state = useSelector((state) => state);
  return (
      <div>
      {state.isAuthenticated ? <Home /> : <AuthMainPage /> }
      </div>
  );
}

export default MainPage;