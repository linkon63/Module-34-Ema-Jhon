import logo from './logo.svg';
import './App.css';
import Header from '../src/componentes/Header/Header';
import Shop from './componentes/Shop/Shop';
import { createContext, useContext, useEffect, useState } from 'react';
import animalData from './data/data.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './componentes/Review/Review';
import Inventory from './componentes/Inventory/Inventory';
import NotFound from './componentes/NotFound/NotFound';
import ProductDetails from './componentes/ProductDetails/ProductDetails';
import Login from './componentes/Login/Login';
import Shipment from './componentes/Shipment/Shipment';
import PrivateRoute from './componentes/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <h3>email : {loggedInUser.email}</h3>
        
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
              <Shop></Shop>
          </Route>
          <Route path="/review">
                <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
                  <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
                  <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
                  <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
                  <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
                  <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
                  <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    
    </UserContext.Provider>
  );
}

export default App;
