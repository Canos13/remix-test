
import { Badge, Tag } from 'antd';
import { Product } from '~/context/productStore';
import { useCartStore } from '../../context/cartStore';
import { showMessage } from '~/utils/messages';
import { useProductDiscount } from '~/hook/useProductDiscount';

const ProductCard = ({ product }: { product: Product, }) => {
    const addToCart = useCartStore(state => state.addToCart);
    const {  hasDiscount,  discount, } = useProductDiscount(product);

    const handleAddToCart = (product: Product) => {
        if (!product.availability) return;
        addToCart(product);
        showMessage({
            text: "Producto Agregado al carrito",
            type: "SUCCESS"
        })
    };

    return (
        <div className="product__card__item">
            <div className='product__card__item__imageContainer'>
                {
                    hasDiscount && <div className='product__card__item__badge__discount'>
                        <Badge count={`-${discount}%`} />
                    </div>
                }
                <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full product__card__item__image"
                    style={{ height: 200 }}
                    onError={e => {
                        //@ts-ignore
                        e.target.src =
                            "https://st2.depositphotos.com/1001335/11384/v/450/depositphotos_113845402-stock-illustration-medicine-bottle-on-white-background.jpg";
                    }}
                />
            </div>
            <div className="product__card__item__info">
                <h3 className="product__card__item__info__productName">{product?.name}</h3>

                {
                    product?.stock
                        ? <Tag className="product__card__item__info__stock" color="success"> Stock: {product?.stock}</Tag  >
                        : <Tag className="product__card__item__info__stock" color="error"> Sin Stock</Tag>

                }


                <div className='product__container__prices'>
                    <span className={`font-bold product__price ${hasDiscount ? "product__price__hasDiscount" : ""}`}>${product?.price}</span>
                    {hasDiscount && <span className="product__listPrice">${product?.listPrice}</span>}
                </div>
                <button
                    onClick={() => handleAddToCart(product)}
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
    );
};

export default ProductCard;