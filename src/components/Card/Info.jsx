import React from "react";
import AppContext from "../../context";

function Info({title, description, src, width}){
    const {cartOpened, setCartOpened} = React.useContext(AppContext);

    return (
        <div className="CartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={width} src={src} alt="" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened(false)} className="btnBuy">
                <img src="/img/arrow.svg" alt="cross" />
                Вернуться назад
            </button>
      </div>
    );
} 

export default Info;