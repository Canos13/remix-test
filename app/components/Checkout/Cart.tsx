import { useCartStore } from "~/context/cartStore";
import ProductItemCheckout from "../Minicart/ProductItemCheckout";
import Summary from "./Summary";

export type CheckoutCurrentStep = {
    onNext?: VoidFunction;
    onPrev?: VoidFunction;
    onDone?: VoidFunction;
};

const Cart = ({ onNext }: CheckoutCurrentStep) => {
    const { cart } = useCartStore();
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