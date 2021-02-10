import React, { useEffect } from 'react';
import Header from './components/Header';
import Home from '../Home';
import Login from '../Login';
import Medicines from '../Medicines';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
function Layout() {

  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  return <>
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/medicines" exact>
          <Medicines />
        </Route>
      </Switch>
    </Router>
  </>
}

export default Layout;