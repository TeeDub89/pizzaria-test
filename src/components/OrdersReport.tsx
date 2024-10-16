"use client";

import { PuffLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { getJSONData } from '@/tools/Toolkit';
import { Orders, Order } from '@/tools/orders.model';


export default function OrdersReport({setAppState, appState}:{setAppState:Function, appState:number}) {
    // retrieve server sided script
    const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

    // ---------------------------- private methods

    const getOrders = async () => {
        const data:Orders = await getJSONData(RETRIEVE_SCRIPT, false, true);
        console.log(data);


        // save it in a state variable - because it is used in JSX and needs to persist
        setOrders(data.orders);


        // all data retrieved. Change app state to 3
        setAppState(3);
    }


    // ---------------------------- use effects
    useEffect(() => {
        if (appState == 2) getOrders();
    }, [appState]);

    // ---------------------------- state variables
    const [orders, setOrders] = useState<Order[]>([]);

    
  
    if(appState == 1){
        return (<>No orders retrieved...</>);
    } else if (appState == 2) {
        return (
        <>
            <div className="flex flex-row items-center" >
            Loading orders...
            <PuffLoader color={"#000000"} loading={true} size={40} />
            </div>
        </>
    );
    } else if (appState == 3) {
        return (
            <>
                {orders.map((order) => (
                    <div key={order.id}>
                        <div key={order.id} className="my-3 text-accent font-bold text-xl">Order #{order.id}:</div>
                        <div className="text-content text-sm font-bold">
                            <i className="fas fa-info-circle"></i> Customer Information
                        </div>
                        <div className="mb-3 text-content text-sm">
                            <div>{order.name}</div>
                            <div>{order.address}</div>
                            <div>{order.city}</div>
                        </div>
                        <div className="text-content text-sm font-bold">
                            <i className="fas fa-pizza-slice"></i> Pizza Size
                        </div>
                        <div className="mb-3 text-content text-sm">
                            <div>{order.size}</div>
                        </div>
                        <div className="text-content text-sm font-bold">
                            <i className="fas fa-list-ul"></i> Toppings
                        </div>
                        <div className="mb-3 text-content text-sm">
                            {order.toppings.map((topping) => (
                                <div key={topping.topping}>{topping.topping}</div>
                            ))}
                        </div>
                        <div className="text-content text-sm font-bold">
                            <i className="fas fa-sticky-note"></i> Order Notes
                        </div>
                        <div className="mb-3 text-content text-sm">
                            {order.notes.map((note) => (
                                <div key={note.note}>{note.note}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </>
        );
    }
    
}
