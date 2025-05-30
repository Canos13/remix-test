import { useAuthStore } from "~/context/authStore"
import { CheckoutCurrentStep } from "./Cart"
import Summary from "./Summary"
import { useEffect } from "react"
import { useOrderFormStore } from "~/context/orderFormStore"

const Info = ({ onNext, onPrev }: CheckoutCurrentStep) => {
    const { user } = useAuthStore()
    const { updateOrderForm, orderForm } = useOrderFormStore()
    useEffect(() => {
         updateOrderForm({ 
            ...orderForm,
            clientProfileData: user
        })
    }, [user])
    return (
        <div className="cart__checkout__general" >
            <div className="cart__checkout__items">
                <div>
                    Correo:
                    <div className="cart__checkout__info__email" >
                        {user?.email}
                    </div>
                </div>
                <div>
                    Nombre:
                    <div className="cart__checkout__info__name">
                        {user?.name}
                    </div>
                </div>
            </div>
            <Summary onNext={onNext} onPrev={onPrev} />
        </div>
    )
}

export default Info