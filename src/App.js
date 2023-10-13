
import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import { CartProvider } from './context/cartContext';
import Home from './components/Home/home';

function App() {
  return (

    <Router>
       <CartProvider>
          <Route path="/" exact component={Home} />
  
      </CartProvider>
    </Router>



    

  );  
}

export default App;