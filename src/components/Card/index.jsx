import React from 'react';
import ContentLoader from 'react-content-loader'
import style from './Card.module.scss'
import AppContext from '../../context';

function Card({
    id,
    title, 
    imgUrl,
    price, 
    onPlus, 
    onAddToFavorite, 
    onRemoveFavorite, 
    onRemoveItem,
    }){
    const {isLoading, isItemAdded, isItemFavorited} = React.useContext(AppContext);

    const onClickPlus = () => {
        (isItemAdded(id) === true) ? onRemoveItem(id) : onPlus({id, title, price, imgUrl});
    }

    const onClickLike = () => {
        (isItemFavorited(id) === true) ? onRemoveFavorite(id) : onAddToFavorite({id, title, price, imgUrl});
    }
 
    return(
        <div className={style.card}>
            {
                isLoading ? <ContentLoader 
                speed={2}
                width={160}
                height={190}
                viewBox="0 0 160 190"
                backgroundColor="#d1cccc"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="10" ry="10" width="160" height="91" /> 
                <rect x="0" y="99" rx="3" ry="3" width="160" height="15" /> 
                <rect x="0" y="120" rx="3" ry="3" width="93" height="15" /> 
                <rect x="0" y="151" rx="8" ry="8" width="80" height="24" /> 
                <rect x="125" y="146" rx="8" ry="8" width="32" height="32" />
              </ContentLoader>: 
                <>
                    <div className="favorite_sneakers" >
                        <img onClick={onClickLike} 
                        src={isItemFavorited(id) ? "/img/heart-like.svg": "/img/heart-unliked.svg"} alt="alt" />
                    </div>
                        <img width={133} height={112} src={imgUrl} alt="sneakers" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        <button className="btn" onClick={onClickPlus}>
                        <img src={(isItemAdded(id)) ? "/img/noCheck.svg":"/img/check.svg"} alt="alt" />
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default Card;