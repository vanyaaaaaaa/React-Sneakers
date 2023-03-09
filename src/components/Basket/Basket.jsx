// import { info } from "node-sass";
import React from "react";
import AppContext from "../../context";
import Info from "../Card/Info";
import axios from "axios";

function Basket(){
  const [orderIsComplete, setOrderIsComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const {itemsBasket, setCartOpened, totalPrice,setItemsBasket, onRemoveItem, loadOrders, setTotalPrice} = React.useContext(AppContext);

  const onClickOrder = async () =>{
    try{
      const { data } = await axios.post("http://localhost:3001/orders", {
        items: itemsBasket,
        amount: totalPrice
      });
      await itemsBasket.map(
        item => {
          axios.delete(`http://localhost:3001/basket/${item.id}`);
        }
      );
      setOrderId(data.id);
      setOrderIsComplete(true);
      setItemsBasket([]);
      loadOrders();
      setTotalPrice(0);
    }catch(error){ 
      alert("Не удалось создать заказ");
    }
  }

    return(
        <div className="overlay">
        <div className="drawer">
                <div className="d-flex justify-between">
                 <h2>Корзина</h2>
                  <button onClick={() => setCartOpened(false)} className="btn removeBtn">
                    <img  src="/img/cross.svg" alt="alt" />
                  </button>
                </div>
      {
        itemsBasket.length > 0 ? 
        (
        <div>
          <div className="items">
        {itemsBasket.map((obj) => 
            <div key={obj.id } className="drawer-card d-flex align-center">
              <div style={{backgroundImage: `url(${obj.imgUrl})`}} className="cardItemImg"></div>
              <div className="card-info">
              <h5>{obj.title}</h5>
              <span>{obj.price} руб.</span>
            </div>
            <button className="btn removeBtn">
              <img src="/img/cross.svg" alt="alt" onClick={() => onRemoveItem(obj.id)}/>
            </button>
      </div>)}
            <ul className="CartTotalBlock mt-30">
            <li>
              <span>Итого:</span>
              <div></div>
              <b>{totalPrice} руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
            </li>
          </ul>
          <button className="btnBuy" onClick={() => onClickOrder()}>
              Оформить заказ 
            <img src="/img/arrow.svg" alt="arrow" />
          </button> 
    </div>
        </div>  
        )
        :
      <Info
        title={orderIsComplete ?  "Заказ оформлен!":"Корзина пустая"}
        description={
          orderIsComplete ? 
        `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
        :
        "Добавьте хотя бы одну пару кросовок, чтобы сделать заказ"
      }
        src={orderIsComplete ? "/img/complect-order.png"
        :
        "/img/basket.png"
      }
        width={"120px"}
      />
      }
              </div>
      </div>
    );
}

export default Basket;