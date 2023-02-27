import { Routes, Route } from "react-router-dom"
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Basket from "./components/Basket/Basket";
import React from 'react';
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [itemsBasket, setItemsBasket] = React.useState([]);
  const [itemsFavorite, setItemsFavorite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:3001/sneakers").then((res) => {
    setItems(res.data);});
    axios.get("http://localhost:3001/basket").then((res) => {
       setItemsBasket(res.data);
    });
    axios.get("http://localhost:3001/favorites").then((res) => {
      setItemsFavorite(res.data);
   });
   axios.get("http://localhost:3001/orders").then((res) => {
    setOrders(res.data);
   });
  },
    []);


  const onAddToCart = (obj) =>{
    axios.post("http://localhost:3001/basket", obj);
    setItemsBasket(prev => [...prev, obj]);
  }

  const onRemoveItem = (id) =>{
    axios.delete(`http://localhost:3001/basket/${id}`);
    setItemsBasket(prev => prev.filter(item => item.id !== id));
  } 

  const onChangeInput = (event) =>{
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = async (obj) =>{
    try{
      if (itemsFavorite.find((favObj) => favObj.id === obj.id)){
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
      } else {
        const {data} = await axios.post("http://localhost:3001/favorites", obj);
        setItemsFavorite((prev) => [...prev, data]);
      }
    } catch(error){
      alert('Произошла ошибка при добавлении в избранное');
    }
  }

  const onRemoveFavorite = (id) => {
    try{
      axios.delete(`http://localhost:3001/favorites/${id}`);
      setItemsFavorite(prev => prev.filter(item => item.id !== id));
    } catch(error){
      console.log('Не удалось удалить из избранного');
    }
  }

  const makeOrder = (obj) => {
    try{
      console.log(obj);
      axios.post("http://localhost:3001/orders", obj);
      setOrders(prev => [...prev, obj]);
    } catch(error){
      alert('Не удалось офрмить заказ');
    }
  }
 
  return (  
    <div className="wrapper clear"> 
      {cartOpened && <Basket 
      items={itemsBasket} 
      onClose={() => setCartOpened(false)} 
      onRemove={onRemoveItem}
      makeOrder={makeOrder}
      />}
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
          onRemoveFavorite={onRemoveFavorite}
          onRemoveItem={onRemoveItem}
        />
        }
        ></Route>
        <Route 
        path="/favorites" element={
        <Favorites 
        itemsFavorite={itemsFavorite}
        onAddToCart={onAddToCart}
        onAddToFavorite={onAddToFavorite}
        onRemoveFavorite={onRemoveFavorite}
        onRemoveItem={onRemoveItem}
        />}>
        </Route>
        <Route
        path="/orders" element={
          <Orders 
          orders={orders}/>
        }
        >
        </Route>
      </Routes>
        </div>
  );
}

export default App;