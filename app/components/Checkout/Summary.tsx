import { useCartStore } from "~/context/cartStore";
import { CheckoutCurrentStep } from "./Cart";

const Summary = ({onNext, onPrev}: CheckoutCurrentStep) => {
    const {
        totalPrice
    } = useCartStore();
    return (
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
            {
                onPrev && (
                    <button 
                        className="cart__checkout__summary__btn cart__checkout__summary__btn__back" 
                        onClick={onPrev}
                    >
                        Regresar
                    </button>
                )
            }
        </div>
    )
}

export default Summary