import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { dummyData, type Category } from "../context/productStore";
import ProductCard from "~/components/Product";
import Filters from "~/components/Filters";
import { AllCategories } from "./productos._index";
import { useWidth } from "~/hook/useViewport";
import { Popover } from "antd";

type dataLoader = {
    category: Category,
    allCategories: AllCategories[],
    slug: string
}

export const meta: MetaFunction = ({ params }) => {
    return [{ title: `Productos - ${params.categoria}` }];
};

export async function loader({ params }: LoaderFunctionArgs) {
    const slug = params.categoria;

    if (!slug) {
        throw new Response("Categoría no especificada", { status: 400 });
    }

    const category = dummyData.find((cat) => cat.id === slug);
    const allCategories = dummyData.map(category => ({
        id: category.id,
        name: category.name
    }));

    console.log({allCategories})

    if (!category) {
        throw new Response("Categoría no encontrada", { status: 404 });
    }

    return json({category,allCategories, slug});
}

export default function PLP() {
    const {category,allCategories, slug} = useLoaderData<typeof loader>() as dataLoader;
    const { isWidth } = useWidth(1024)

    return (
        <div className="py-6 main__container__products">

            <div className="product__list__breadcrumb" >
                <Link className="product__list__item" to="/">Inicio</Link>
                <Link className="product__list__item" to="/">/</Link>
                <Link className="product__list__item" to="/productos">Todos los productos</Link>
                <Link className="product__list__item product__list__item__active" to="/productos">/</Link>
                <Link className="product__list__item product__list__item__active" to={`/productos/${category?.id}`}>{category?.name}</Link>
            </div>
            <h1 className="text-3xl font-bold mb-4">{category?.name} ({category?.products?.length})</h1>

            <div className="product__list__main">
                {
                    isWidth 
                        ? <Popover placement="bottom" content={ <Filters slug={slug} allCategories={allCategories} /> } trigger="click">
                              <button className="filters__mobile__btn">Filtros</button>
                           </Popover> 
                        : <Filters slug={slug} allCategories={allCategories} />
                }

                <div className="product__list__section__container">
                    {category?.products?.map((product) => (
                        <ProductCard
                            key={product?.name}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}