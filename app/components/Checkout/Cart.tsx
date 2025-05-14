import { useCartStore } from "~/context/cartStore";
import ProductItemCheckout from "../Minicart/ProductItemCheckout";

export type CheckoutCurrentStep = {
    onNext?: VoidFunction;
    onPrev?: VoidFunction;
    onDone?: VoidFunction;
};

const Cart = ({ onNext }: CheckoutCurrentStep) => {
    const { 
        cart,
        totalPrice
    } = useCartStore();
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
            <div className="cart__checkout__summary">
                <h4>Resumen</h4>
                <div className="cart__checkout__summary__totals">
                    <div>Subtotal:</div>
                    <div>${totalPrice().toFixed(2)}</div>
                </div>
                <div className="cart__checkout__summary__totals">
                    <div>Total estimado:</div>
                    <div>${totalPrice().toFixed(2)}</div>
                </div>

                <button className="cart__checkout__summary__btn" onClick={onNext}>Continuar</button>
            </div>
        </div>
    )
}

export default Cart