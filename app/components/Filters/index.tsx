import { Link, useLoaderData } from "@remix-run/react";
import { AllCategories } from "~/routes/productos._index";


const Filters = ({allCategories, slug = ""}: {allCategories: AllCategories[], slug?: string}) => {
   
    return (
        <div className="product__list__filter">
            <h4 className="product__list__filter__title">Filtros</h4>
            {
                allCategories?.map(categories => (
                    <Link
                        key={categories.id}
                        className={`product__list__item ${categories.id===slug ? "product__list__item__active" : ""}`}
                        to={`/productos/${categories.id}`}
                    >
                        {categories.name}
                    </Link>
                ))
            }
        </div>
    )
}

export default Filters