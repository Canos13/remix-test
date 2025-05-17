
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Carrousel from '../../components/Carrousel'
import { Link, useLoaderData } from "@remix-run/react";
import { dummyData, Product } from "~/context/productStore";
import { Settings } from "react-slick";
import ProductCard from "~/components/Product";
import { useOrderFormStore } from "~/context/orderFormStore";
import { useEffect } from "react";
import { getUserIdSession } from "~/controller/auth.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "BrudiFarma" },
		{ name: "description", content: "Welcome to BrudiFarma!" }
	];
};

type dataCategory = {
	id: string,
	src: string,
	alt: string,
	link: string
}

type dataLoader = {
	dataCategories: dataCategory[],
	allProducts: Product[],
	isAuthenticated: boolean
}

const dataCategories = [
	{
		id: "category__1",
		src: "/arquivos/categoria1.avif",
		alt: "categoria 1",
		link: "/productos/analgesicos"
	},
	{
		id: "category__2",
		src: "/arquivos/categoria2.avif",
		alt: "categoria 2",
		link: "/productos/antibioticos"
	},
	{
		id: "category__3",
		src: "/arquivos/categoria3.avif",
		alt: "categoria 3",
		link: "/productos/antihistaminicos"
	},
	{
		id: "category__4",
		src: "/arquivos/categoria4.avif",
		alt: "categoria 4",
		link: "/productos/gastrointestinales"
	}
]

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await getUserIdSession(request)
	const allProducts = dummyData.flatMap(category => category.products);
	return Response.json({
		dataCategories,
		allProducts,
		isAuthenticated: userId ? true : false
	});
}

export default function Index() {
	const { dataCategories, allProducts, isAuthenticated } = useLoaderData<typeof loader>() as dataLoader;
	const { clearOrderForm } = useOrderFormStore();
	const config: Settings = {
		arrows: true,
		dots: true,
		slidesToShow: 4,
		slidesToScroll: 4
	}

	useEffect(() => {
		if (!isAuthenticated) {
			clearOrderForm()
		}
	}, [isAuthenticated])
	

	return (
		<div className="shop__container">
			<div className="shop__container__carrousel" >
				<Carrousel className="shop__main__carrousel">
					<img className="info__image__carrousel" src="/arquivos/HB_Hero_Inf_2_D_25.avif" />
					<img className="info__image__carrousel" src="/arquivos/HB_Hero_Inf_5_D_25.avif" />
					<img className="info__image__carrousel" src="/arquivos/HB_Hero_Inf_3_DR_25.jpg" />
				</Carrousel>
			</div>

			<div className="shop__container__categories">
				<h1 className="shop__container__categories__title">Conoce nuestras categorías</h1>
				<div className="shop__container__categories__images" >
					{
						dataCategories.map(category => (
							<Link className="shop__container__categories__link" key={category.id} to={category.link} >
								<img className="shop__container__categories__image" src={category.src} alt={category.alt} />
							</Link>
						))
					}
				</div>
				<div className="shop__container__categories__showMore">
					<Link className="shop__container__categories__showMore__link" to="/todas-las-categorias" >Ver todas las categorias</Link>
				</div>
			</div>

			<div className="shop__main__products__slider" >
				<Carrousel config={config} className="shop__main__carrousel__products">
					{allProducts.map((product) => (
						<ProductCard
							key={product.name}
							product={product}
						/>
					))}
				</Carrousel>
			</div>

			<div className="shop__container__image__full">
				<Link className="shop__container__image__link" to="/#">
					<img className="shop__container__image__item" src="/arquivos/cintillo-Ene25-novedades-d-v1.jpg" />
				</Link>
			</div>
		</div>
	);
}
