import logo from './logo.svg';
import './App.css';
import Header from '../src/componentes/Header/Header';
import Shop from './componentes/Shop/Shop';
import { useEffect, useState } from 'react';
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
function App() {


    //Fake JSON Data Importing 

    const [animelName, setAnimale] = useState([]);
    useEffect(()=>{
        setAnimale(animalData);
        //console.log(animalData);
    })

  return (

    <div>
        <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
              <Shop></Shop>
          </Route>
          <Route path="/review">
                <Review></Review>
          </Route>
          <Route path="/inventory">
                  <Inventory></Inventory>
          </Route>
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
    
    </div>
  );
}

export default App;
