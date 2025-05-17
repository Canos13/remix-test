import { useCartStore } from "~/context/cartStore";
import ProductItemCheckout from "../Minicart/ProductItemCheckout";
import Summary from "./Summary";
import { useOrderFormStore } from "~/context/orderFormStore";
import { useEffect } from "react";

export type CheckoutCurrentStep = {
    onNext?: VoidFunction;
    onPrev?: VoidFunction;
    onDone?: VoidFunction;
};

const Cart = ({ onNext }: CheckoutCurrentStep) => {
    const { cart } = useCartStore();
    const { updateOrderForm, orderForm } = useOrderFormStore()

    useEffect(() => {
        updateOrderForm({ 
            ...orderForm,
            items: cart
        })
    }, [cart])
    
    return (
        <div className="cart__checkout__general" >
            <div className="cart__checkout__items">
                {
                    cart.map(item => 
                        <ProductItemCheckout
                            key={item.id}
                            {...item}
                        />
                    )
                }
            </div>
            <Summary onNext={onNext} />
        </div>
    )
}

export default Cart