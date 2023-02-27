import Card from "../components/Card";
import {Link} from "react-router-dom";

function Orders({orders = []}){
    return(
        <div>
        {
            orders.length > 0 ?
            (
                <div>
                    {
                        orders.map((order) =>{
                            <Card
                                {...order}
                            />
                        })
                    }
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