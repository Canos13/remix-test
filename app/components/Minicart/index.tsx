import { Drawer, Badge, Button, List, Avatar, InputNumber } from 'antd';
import { useCartStore } from '../../context/cartStore';
import { useState } from 'react';
import { Product } from '~/context/productStore';
import ProductItem from './ProductItem';

const MiniCart = () => {
    const [open, setOpen] = useState(false);
    /* const {  hasDiscount,  discount, } = useProductDiscount(product); */
    const {
        cart,
        totalItems,
        totalPrice,
        updateQuantity
    } = useCartStore();

    return (
        <div className="mini-cart">
            <Badge  count={totalItems()} showZero={false} >
                <button className='minicart__button'
                    onClick={() => setOpen(true)} />
            </Badge>

            <Drawer
                title="Tu Carrito"
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
                width={400}
            >
                <div className='minicart__content' >
                    <div className='minicart__content__list__items'>
                        {
                            cart.map( item => <ProductItem
                                key={item.id}
                               {...item}
                            />)
                        }
                    </div>

                    <div className="minicart__cart__summary">
                        <div className='minicart__cart__summary__totals'>
                            <div className='minicart__cart__summary__ minicart__cart__summary__total'>
                                <div className='minicart__cart__summary__text'>Total</div>
                                <div className='minicart__cart__summary__value'>${totalPrice().toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="minicart__cart__actions">
                            <button className="minicart__cart__checkout">
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default MiniCart;