import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Caixa } from "./pages/Caixa";
import { Navbar } from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

function App() {
  return (    
      <CartProvider>
        <BrowserRouter>
          <Navbar />          
          <Routes>
            <Route path="/" element={<Caixa />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>    
  );
}

export default App;
