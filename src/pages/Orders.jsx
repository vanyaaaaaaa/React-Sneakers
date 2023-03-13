import Card from "../components/Card";
import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Orders(){
    const [orders, setOrders] = React.useState([]);

    const loadOrders = async () =>{
        try{
            const { data } = await axios.get("http://localhost:3001/orders");
            setOrders(data);
        }catch(error){
            alert('Произошла ошибка при проверке заказов');
            console.error(error);
        }
    };

    React.useEffect(() => {
        loadOrders();
    }, []);
    
    const delOrder = async (id) => {
        try {
            setOrders(prev => prev.filter(item => item.id !== id));
            await axios.delete(`http://localhost:3001/orders/${id}`);
        } catch(error){
            alert('Произошла ошибка при удалении заказа');
            console.error(error);
        }
    } 

    return(
        <div className="content p-40">
        {
            orders.length > 0 ?
            (
            <div>
                <h1>Мои заказы</h1>
                {orders.map((order) => {
                return <>
                   <h2>#{order.id}</h2>
                   <p>Сумма: {order.amount} руб.</p>
                   <div className="d-flex flex-wrap">
                    {order.items.map(item =>
                        <Card
                            title={item.title}
                            price={item.price}
                            imgUrl={item.imgUrl}
                        />
                    )}
                   </div>
                   <button className="btnBuy" onClick={() => delOrder(order.id)}>Отказаться</button>
                </>
                })}
            </div>
            )
            :
            (
            <div className="m-20 text-center w100p">
                <img width={45} height={45} src="/img/smile.png" alt="smile" />
                <h3>У вас нет заказов</h3>
                <p className="opacity-4">Вы нищеброд? 
                    Оформите хотя бы один заказ.
                </p>
                <Link to="/">
                    <button className="btnBuy">Вернуться назад</button>
                </Link>
            </div>
            )
        }
        </div>
    )
}

export default Orders;