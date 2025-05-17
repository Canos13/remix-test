import { Address, useAddressStore } from "~/context/addressStore"
import { CheckoutCurrentStep } from "./Cart"
import Summary from "./Summary"
import { useEffect, useState } from "react"
import { Skeleton } from "antd"
import { useOrderFormStore } from "~/context/orderFormStore"

const Shipping = ({ onNext, onPrev }: CheckoutCurrentStep) => {
    const { address, getAddress, loading } = useAddressStore()
    const { orderForm, updateOrderForm } = useOrderFormStore();
    const [AddressSelected, setAddressSelected] = useState<Address | null>()

    useEffect(() => {
        setAddressSelected(orderForm?.shippingData)
    }, [orderForm])

    useEffect(() => {
        if (!address.length) {
            getAddress()
        }
    }, [address])

    const handleSelectAddress = (address: Address) => {
        updateOrderForm({
            ...orderForm,
            shippingData: address
        })
    }

    const handleCheckedAddress = (address: Address): string => {
        if(AddressSelected){
            if(address.id === AddressSelected.id){
                return "checkout__address__item__active"
            }
        } else {
            if(address.isDefault)  return "checkout__address__item__active"
        }
        return "";
    }

    return (
        <div className="cart__checkout__general" >
            <div className="cart__checkout__items">
                {loading && <Skeleton active />}

                <div className="checkout__address__list">
                    <div>Mis direcciones</div>
                    {
                        address.map(address => {
                            return <div onClick={() =>handleSelectAddress(address)} key={address.id} className={`checkout__address__item ${handleCheckedAddress(address)}`} >
                                <div>
                                    <div className="checkout__address__info">{address.street}, No. {address.number}</div>
                                    <div className="checkout__address__info">{address.city}, Cp: {address.zipCode}</div>
                                    <div className="checkout__address__info">{address.state}, {address.country}.</div>
                                </div>
                            </div>

                        })
                    }
                </div>
            </div>
            <Summary onNext={onNext} onPrev={onPrev} />
        </div>
    )
}

export default Shipping