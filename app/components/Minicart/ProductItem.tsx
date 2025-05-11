import { CartItem, useCartStore } from "~/context/cartStore";
import { Product } from "~/context/productStore"
import { showMessage } from "~/utils/messages"
import { useProductDiscount } from '~/hook/useProductDiscount';
import { Badge, InputNumber } from "antd";

const ProductItem = (item: CartItem) => {
    const { hasDiscount, discount, } = useProductDiscount(item);
    const {
        removeFromCart,
        updateQuantity
    } = useCartStore();

    const handleDeleteItem = (id: Product['id']) => {
        removeFromCart(id)
        showMessage({
            text: "Carrito actualizado",
            type: 'INFO'
        })
    }

    return (
        <div className="minicart__content__list__item" >
            <div>
                {
                    hasDiscount && <div className='product__card__item__badge__discount'>
                        <Badge count={`-${discount}%`} />
                    </div>
                }
                <img className="minicart__content__list__image" src={item.image} alt={item.name} />
            </div>
            <div className="minicart__content__list__info">
                <h3>{item.name}</h3>
                <div className="minicart__content__list__prices">
                    <div className={`minicart__content__list__price  ${hasDiscount ? "product__price__hasDiscount" : ""}`}>
                        ${item.price}
                    </div>
                    {hasDiscount && <div className="minicart__content__listPrice">${item.listPrice}</div>}

                </div>
                <div>
                    <InputNumber
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, value as number)}
                        size="middle"
                        className="minicart__content__item__input"
                    />
                </div>
            </div>
            <div>
                <button
                    className='minicart__delete__item'
                    onClick={() => handleDeleteItem(item.id)}
                >
                </button>
            </div>
        </div>
    )
}

export default ProductItem