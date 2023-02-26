function Basket({onClose, onRemove, items = []}){
    return(
        <div className="overlay">
        <div className="drawer">
                <div className="d-flex justify-between">
                 <h2>Корзина</h2>
                  <button onClick={onClose} className="btn removeBtn">
                    <img  src="/img/cross.svg" alt="alt" />
                  </button>
                </div>

      {
        items.length > 0 ? 
        (
        <div>
          <div className="items">
        {items.map((obj) => 
            <div className="drawer-card d-flex align-center">
              <div style={{backgroundImage: `url(${obj.imgUrl})`}} className="cardItemImg"></div>
              <div className="card-info">
              <h5>{obj.title}</h5>
              <span>{obj.price} руб.</span>
            </div>
            <button className="btn removeBtn">
              <img src="/img/cross.svg" alt="alt" onClick={() => onRemove(obj.id)}/>
            </button>
      </div>)}
            <ul className="CartTotalBlock">
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="btnBuy">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button> 
    </div>
        </div>  
        )
        :
        (<div className="CartEmpty d-flex align-center justify-center flex-column flex">
        <img className="mb-20" width="120px" height="120px" src="/img/basket.png" alt="" />
        <h2>Корзина пустая</h2>
        <p className="opacity-6">Добавьте хотя бы одну пару кросовок, чтобы сделать заказ</p>
        <button onClick={onClose} className="btnBuy">
          <img src="/img/arrow.svg" alt="cross" />
          Вернуться назад
        </button>
      </div>)
      }
              </div>
      </div>
    );
}

export default Basket;