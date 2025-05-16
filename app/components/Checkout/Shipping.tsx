import { useAddressStore } from "~/context/addressStore"
import { CheckoutCurrentStep } from "./Cart"
import Summary from "./Summary"
import { useEffect } from "react"

const Shipping = ({onNext,onPrev}: CheckoutCurrentStep) => {
    const { address, error, getAddress, loading } = useAddressStore()

    useEffect(() => {
        if(!address.length){
            getAddress()
        }
    }, [address])

    useEffect(() => {
        console.log(address)
    }, [address])
    
    return (
        <div className="cart__checkout__general" >
            <div className="cart__checkout__items">
                info shipping
            </div>
            <Summary onNext={onNext} onPrev={onPrev} />
        </div>
    )
}

export default Shipping