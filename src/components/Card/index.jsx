import style from './Card.module.scss'
function Card(props){
    return(
        <div className={style.card}>
    <div className="favorite_sneakers">
        <img src="/img/heart-unliked.svg" alt="alt" />
    </div>
    <img width={133} height={112} src={props.imgUrl} alt="sneakers" />
    <h5>{props.name}</h5>
    <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{props.price}</b>
        </div>
            <button className="btn">
            <img  src="/img/plus.svg" alt="alt" />
            </button>
    </div>
</div>
    )
}

export default Card;