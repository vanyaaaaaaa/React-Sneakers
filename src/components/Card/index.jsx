import React from 'react';
import style from './Card.module.scss'

function Card({id, title, imgUrl, price, onPlus, onAddToFavorite, favorited = false}){
    const [isAdd, setIsAdd] = React.useState(false);
    const [isLike, setLike] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({id, title, price, imgUrl});
        setIsAdd(!isAdd);
    }

    const onClickLike = () => {
        setLike(!isLike);
        onAddToFavorite({id, title, price, imgUrl});
    }

    return(
        <div className={style.card}>
    <div className="favorite_sneakers" >
        <img onClick={onClickLike} src={isLike ? "/img/heart-like.svg": "/img/heart-unliked.svg"} alt="alt" />
    </div>
    <img width={133} height={112} src={imgUrl} alt="sneakers" />
    <h5>{title}</h5>
    <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
        </div>
            <button className="btn" onClick={onClickPlus}>
            <img src={(isAdd) ? "/img/noCheck.svg":"/img/check.svg"} alt="alt" />
            </button>
    </div>
</div>
    )
}

export default Card;