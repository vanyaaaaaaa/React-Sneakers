import React from "react";
import AppContext from "../../context";
import {Link} from 'react-router-dom';

function Info({title, description, imgUrl, width}){
    const {setCartOpened} = React.useContext(AppContext);

    return (
        <div className="CartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={width} src={imgUrl} alt="" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <Link to="/">
                <button onClick={() => setCartOpened(false)} className="btnBuy">
                    <img src="/img/arrow.svg" alt="cross" />
                    Вернуться назад
                </button>
            </Link>
      </div>
    );
} 

export default Info;