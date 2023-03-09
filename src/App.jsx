import { Routes, Route } from "react-router-dom"
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Basket from "./components/Basket/Basket";
import React from 'react';
import Orders from "./pages/Orders";
import AppContext from "./context";


function App() {
  const [items, setItems] = React.useState([]);
  const [itemsBasket, setItemsBasket] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [itemsFavorite, setItemsFavorite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function fetchData(){
    const itemsRes = await axios.get("http://localhost:3001/sneakers");
    const itemsResBask = await axios.get("http://localhost:3001/basket");
    const itemsResFav = await axios.get("http://localhost:3001/favorites");

    setIsLoading(false);

    setItems(itemsRes.data);
    setItemsBasket(itemsResBask.data);
    calcTotalPrice();
    setItemsFavorite(itemsResFav.data);
    loadOrders();
  }

  React.useEffect(() => {
    fetchData();
  },
    []); 

  const loadOrders = async () => {
    const itemsResOrders = await axios.get("http://localhost:3001/orders");
    setOrders(itemsResOrders.data);
  }

  const onAddToCart = async (obj) =>{
    try{
      if (itemsBasket.find((items) => Number(items.id) === Number(obj.id))){
        await axios.delete(`http://localhost:3001/basket/${obj.id}`);
        setItems(prev => prev.filter(item => item.id !== obj.id));
        calcTotalPrice();
      } else {
        await axios.post("http://localhost:3001/basket", obj);
        setItemsBasket(prev => [...prev, obj]);
        calcTotalPrice();
      }

    }catch(error){
      alert('Не удалось добавить товар в корзину');
    }
  }

  const onRemoveItem = async (id) =>{
    try{
      await axios.delete(`http://localhost:3001/basket/${id}`);
      setItemsBasket(prev => prev.filter(item => Number(item.id) !== Number(id)));
      calcTotalPrice();
    } catch(error){
      console.log('Не удалось удалить товар');
    }
  } 

  const onChangeInput = (event) =>{
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = async (obj) =>{
    try{
      if (itemsFavorite.find((favObj) => Number(favObj.id) === Number(obj.id))){
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
      } else {
        const {data} = await axios.post("http://localhost:3001/favorites", obj);
        setItemsFavorite((prev) => [...prev, data]);
      }
    } catch(error){
      alert('Произошла ошибка при добавлении в избранное');
    }
  }

  const onRemoveFavorite = async (id) => {
    try{
      await axios.delete(`http://localhost:3001/favorites/${id}`);
      setItemsFavorite(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch(error){
      console.log('Не удалось удалить из избранного');
    }
  }

  const isItemAdded = (id) =>{
    return itemsBasket.some(obj => Number(obj.id) === Number(id));
  }
 
  const isItemFavorited = (id) => {
    return itemsFavorite.some(obj => Number(obj.id) === Number(id));
  };

  const calcTotalPrice = async () =>{
    let sneakers = await axios.get("http://localhost:3001/basket/");
    let result = sneakers.data.reduce((sum, elem) =>{
      return sum + elem.price;
    }, 0);

    setTotalPrice(result);
  }

  return (  
    <AppContext.Provider value={{isLoading, items, itemsBasket, itemsFavorite,cartOpened,totalPrice,orders,
     isItemAdded, onAddToCart, onAddToFavorite, onRemoveFavorite, onRemoveItem, isItemFavorited, setCartOpened, setItemsBasket,onRemoveItem, loadOrders, setTotalPrice}}>
      <div className="wrapper clear"> 
      {cartOpened && <Basket/>}
      <Header/>
      <Routes>
        <Route
        path="/"
        element={
        <Home
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeInput={onChangeInput}
        />
        }
        ></Route>
        <Route 
        path="/favorites" element={
        <Favorites/>
        }>
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
    </AppContext.Provider>
  );
}

export default App;