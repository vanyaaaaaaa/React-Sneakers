import { Routes, Route } from "react-router-dom"
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Basket from "./components/Basket/Basket";
import React from 'react';

function App() {
  const [items, setItems] = React.useState([]);
  const [itemsBasket, setItemsBasket] = React.useState([]);
  const [itemsFavorite, setItemsFavorite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  React.useEffect(() => {
    axios.get("http://localhost:3004/sneakers").then((res) => {
    setItems(res.data);});
    axios.get("http://localhost:3004/basket").then((res) => {
       setItemsBasket(res.data);
    });
    axios.get("http://localhost:3004/favorites").then((res) => {
      setItemsFavorite(res.data);
   })},
    []);

  const onAddToCart = (obj) =>{
    axios.post("http://localhost:3004/basket", obj);
    setItemsBasket(prev => [...prev, obj]);
  }

  const onRemoveItem = (id) =>{
    axios.delete(`http://localhost:3004/basket/${id}`);
    setItemsBasket(prev => prev.filter(item => item.id !== id));
  } 

  const onChangeInput = (event) =>{
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = async (obj) =>{
    if (itemsFavorite.find((favObj) => favObj.id === obj.id)){
      axios.delete(`http://localhost:3004/favorites/${obj.id}`);
    } else {
      const {data} = await axios.post("http://localhost:3004/favorites", obj);
      setItemsFavorite((prev) => [...prev, data]);
    }
  }
 
  return (  
    <div className="wrapper clear"> 
      {cartOpened && <Basket items={itemsBasket} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      <Routes>
        <Route
        path="/"
        element={
        <Home
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeInput={onChangeInput}
          items={items}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
        }
        ></Route>
        <Route 
        path="/favorites" element={
        <Favorites 
        itemsFavorite={itemsFavorite}
        />}>
        </Route>
      </Routes>
        </div>
  );
}

export default App;