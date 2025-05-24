import { Badge } from "antd";
import { Product } from "~/context/productStore";

interface ProductImage {
    hasDiscount: boolean
    discount: number
    product: Partial<Product>
    clases?: string[]
}

const ProductImage = ({hasDiscount, discount, product, clases}: ProductImage) =>
    
    <div className={`product__card__item__imageContainer ${clases?.[0]}`}>
        {
            hasDiscount && <div className={`product__card__item__badge__discount ${clases?.[1]}`}>
                <Badge count={`-${discount}%`} />
            </div>
        }
        <img
            src={product?.image}
            alt={product?.name}
            className={`product__card__item__image ${clases?.[2]}`}
            style={{ height: 200 }}
            onError={e => {
                //@ts-ignore
                e.target.src =
                    "https://st2.depositphotos.com/1001335/11384/v/450/depositphotos_113845402-stock-illustration-medicine-bottle-on-white-background.jpg";
            }}
        />
    </div>

export default ProductImage