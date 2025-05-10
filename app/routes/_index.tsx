
import type { MetaFunction } from "@remix-run/node";
import Carrousel from '../components/Carrousel'
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" }
	];
};

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

export default function Index() {
	return (
		<div className="shop__container">
			<div className="shop__container__carrousel" >
				<Carrousel className="shop__main__carrousel">
					<img className="info__image__carrousel" src="/arquivos/HB_Hero_Inf_2_D_25.avif"  />
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

			<div className="shop__container__image__full">
				<Link className="shop__container__image__link" to="/#">
					<img className="shop__container__image__item" src="/arquivos/cintillo-Ene25-novedades-d-v1.jpg" />
				</Link>
			</div>
		</div>
	);
}
