import { Tag } from 'antd'

const ProductStock = ({stock}: {stock: number}) => {
    if(stock){
        return (
            <Tag className="product__card__item__info__stock" color="success">
                Stock: {stock}
            </Tag>
        )
    }
    return (
       <Tag className="product__card__item__info__stock" color="error">Sin Stock</Tag>
    )
}

export default ProductStock