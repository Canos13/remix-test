import { Badge, Tooltip } from "antd"
import { CartItem, useCartStore } from "~/context/cartStore"
import { useProductDiscount } from "~/hook/useProductDiscount";
import { showMessage } from "~/utils/messages";

const ProductItemCheckout = (item: CartItem) => {
    const { hasDiscount, discount, } = useProductDiscount(item);
    const {
        removeFromCart,
        updateQuantity
    } = useCartStore();

    const handlePlus = (item: CartItem) => {
        updateQuantity(item.id, item.quantity + 1)
        showMessage({
            text: "Carrito actualizado",
            type: 'INFO'
        })
    }
    const handleMinus = (item: CartItem) => {
        if (item.quantity === 1) {
            removeFromCart(item.id)
            showMessage({
                text: `Producto ${item.name} eliminado`,
                type: 'INFO'
            })
            return
        }
        updateQuantity(item.id, item.quantity - 1)
        showMessage({
            text: "Carrito actualizado",
            type: 'INFO'
        })
    }
    return (
        <div className="cart__checkout__product__item" key={item.id} >
            <div className="cart__checkout__product__image" style={{ position: "relative" }}>
                {
                    hasDiscount && <div className='cart__checkout__badge__discount'>
                        <Badge count={`-${discount}%`} />
                    </div>
                }
                <img src={item.image} alt={item.name} />
            </div>
            <div className="cart__checkout__product__name" >
                <h4> {item.name} </h4>
            </div>
            <div className="cart__checkout__quantity">
                <Tooltip title="Disminuir">
                    <button onClick={() => handleMinus(item)} className="cart__checkout__minus"></button>
                </Tooltip>
                <span>{item.quantity}</span>
                <Tooltip title="Aumentar">
                    <button onClick={() => handlePlus(item)} className="cart__checkout__plus"></button>
                </Tooltip>
            </div>
            <div className="cart__checkout__list__prices">
                <div className={`cart__checkout__list__price  ${hasDiscount ? "cart__checkout__price__hasDiscount" : ""}`}>
                    ${item.price}
                </div>
                {hasDiscount && <div className="cart__checkout__listPrice">${item.listPrice}</div>}
            </div>
            <div className="cart__checkout__list__delete">
                <Tooltip title={`Eliminar ${item.name}`}>
                    <button onClick={() => removeFromCart(item.id)} className="cart__checkout__list__delete__btn"></button>
                </Tooltip>
            </div>

        </div>
    )
}

export default ProductItemCheckout