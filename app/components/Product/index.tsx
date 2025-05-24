
import { Modal, Tag } from 'antd';
import { Product } from '~/context/productStore';
import { useCartStore } from '../../context/cartStore';
import { showMessage } from '~/utils/messages';
import { useProductDiscount } from '~/hook/useProductDiscount';
import { useState } from 'react';
import ProductImage from '../global/ProductImage';
import ProductStock from '../global/ProductStock';

const ProductCard = ({ product }: { product: Product, }) => {
    const addToCart = useCartStore(state => state.addToCart);
    const { hasDiscount, discount, } = useProductDiscount(product);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);


    const handleAddToCart = (product: Product) => {
        if (!product.availability) return;
        addToCart(product);
        showMessage({
            text: "Producto Agregado al carrito",
            type: "SUCCESS"
        })
    };

    return (
        <>
            <div className="product__card__item" onClick={showModal}>
                <ProductImage 
                    discount={discount}
                    product={product}
                    hasDiscount={hasDiscount}
                    clases={["","","w-full"]}
                />
                <div className="product__card__item__info">
                    <h3 className="product__card__item__info__productName">{product?.name}</h3>
                    <ProductStock stock={product.stock} /> 

                    <div className='product__container__prices'>
                        <span className={`font-bold product__price ${hasDiscount ? "product__price__hasDiscount" : ""}`}>${product?.price}</span>
                        {hasDiscount && <span className="product__listPrice">${product?.listPrice}</span>}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product)
                        }}
                        className={
                            `px-4 py-2 text-white button__add__to__cart
                            ${product?.availability
                                ? "product__item__availability"
                                : "product__item__not__availability"
                            }`
                        }
                    >
                        {product?.availability ? "Agregar" : "No disponible"}
                    </button>

                </div>
            </div>

            <Modal destroyOnClose title={product?.name} onCancel={handleCancel} open={isModalOpen} className='modal__product__item' okText="Cerrar" onOk={handleOk}>
                <ProductImage 
                    discount={discount}
                    product={product}
                    hasDiscount={hasDiscount}
                />
            </Modal>
        </>
    );
};

export default ProductCard;