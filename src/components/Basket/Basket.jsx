function Basket(){
    return(
        <div style={{display: "none"}} className="overlay">
        <div className="drawer">
                <div className="d-flex justify-between">
                <h2>Корзина</h2>
                  <button className="btn removeBtn">
                    <img  src="/img/cross.svg" alt="alt" />
                  </button>
                </div>
              <div className="items">            
                <div className="drawer-card d-flex align-center">
                <div style={{backgroundImage: "url('/img/sneakers/12.png')"}} className="cardItemImg"></div>
                <div className="card-info">
                <h5>Мужские Кроссовки Nike Air Max 270</h5>
                <span>12 999 руб.</span>
              </div>
              <button className="btn removeBtn">
                <img src="/img/cross.svg" alt="alt" />
              </button>
            </div>
            
            <div className="drawer-card d-flex align-center">
              <div style={{backgroundImage: "url('/img/sneakers/10.png')"}} className="cardItemImg"></div>
              <div className="card-info">
                <h5>Мужские Кроссовки Nike Air Max 270</h5>
                <span>8 499 руб.</span>
              </div>
              <button className="btn removeBtn">
                  <img  src="/img/cross.svg" alt="alt" />
              </button>
            </div>
          </div>
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
    );
}

export default Basket;