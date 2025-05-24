
interface ProductPriceProps {
    hasDiscount: boolean,
    listPrice: number
    price: number
}

const ProductPrice = ({hasDiscount, listPrice, price}: ProductPriceProps) =>
    
    <div className='product__container__prices'>
        <span className={`font-bold product__price ${hasDiscount ? "product__price__hasDiscount" : ""}`}>${price}</span>
        {hasDiscount && <span className="product__listPrice">${listPrice}</span>}
    </div>


export default ProductPrice