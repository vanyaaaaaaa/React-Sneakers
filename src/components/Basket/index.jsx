// import { info } from "node-sass";
import React from "react";
import AppContext from "../../context";
import Info from "../Card/Info";
import axios from "axios";
import styles from './Basket.module.scss'

function Basket({opened}){
  const [orderIsComplete, setOrderIsComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const {itemsBasket, setCartOpened, totalPrice,setItemsBasket, onRemoveItem, setTotalPrice} = React.useContext(AppContext);

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
      setTotalPrice(0);
    }catch(error){ 
      alert("Не удалось создать заказ");
    }
  }

    return(
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible: ''}`}>
        <div className={styles.drawer}>
                <div className="d-flex justify-between">
                 <h2>Корзина</h2>
                    <img  onClick={() => setCartOpened(false)} className={`btn ${styles.removeBtn}`} src="/img/cross.svg" alt="alt" />
                </div>
      { 
        itemsBasket.length > 0 ? 
        (
        <div>
          <div className={styles.items}>
        {itemsBasket.map((obj) => 
            <div key={obj.id } className={`${styles.drawer_card} d-flex align-center`}>
              <div style={{backgroundImage: `url(${obj.imgUrl})`}} className={styles.cardItemImg}></div>
              <div className={styles.card_info}>
              <h5>{obj.title}</h5>
              <span>{obj.price} руб.</span>
            </div>
              <img className={`btn ${styles.removeBtn}`} src="/img/cross.svg" alt="alt" onClick={() => onRemoveItem(obj.id)}/>
      </div>)}
        </div>
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
          <button className={`${styles.btnBuy}`} onClick={() => onClickOrder()}>
              Оформить заказ 
            <img src="/img/arrow.svg" alt="arrow" />
          </button> 
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
        imgUrl={orderIsComplete ? "/img/complect-order.png"
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