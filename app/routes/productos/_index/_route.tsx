import { Link, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { dummyData, Product } from "../../../context/productStore";
import ProductCard from "~/components/Product";
import Filters from "~/components/Filters";
import { useWidth } from "~/hook/useViewport";
import { Popover } from "antd";

export type AllCategories = {
    id: string,
    name: string
}

type dataLoader = {
    allProducts: Product[],
    allCategories: AllCategories[]
}

export const meta: MetaFunction = () => {
    return [{ title: `Productos - BrudiFarma` }];
};

export async function loader() {
    const allProducts = dummyData.flatMap(category => category.products);
    const allCategories = dummyData.map(category => ({
        id: category.id,
        name: category.name
    }));

    return Response.json({ allProducts, allCategories });
}

export default function PLP() {
    const { allProducts, allCategories } = useLoaderData<typeof loader>() as dataLoader;

    const { isWidth } = useWidth(1024)

    return (
        <div className="py-6 main__container__products">
            <div className="product__list__breadcrumb" >
                <Link className="product__list__item" to="/">Inicio</Link>
                <Link className="product__list__item product__list__item__active" to="/">/</Link>
                <Link className="product__list__item product__list__item__active" to="/productos">Todos los productos</Link>
            </div>

            <h1 className="text-3xl font-bold mb-4">Todos los productos ({allProducts.length})</h1>

            <div className="product__list__main">
                {
                    isWidth 
                        ? <Popover placement="bottom" content={ <Filters allCategories={allCategories} /> } trigger="click">
                              <button className="filters__mobile__btn">Filtros</button>
                           </Popover> 
                        : <Filters allCategories={allCategories} />
                }
                

                <div className="product__list__section__container">
                    {allProducts.map((product) => (
                        <ProductCard
                            key={product.name}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}