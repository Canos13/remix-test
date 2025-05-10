import { memo, useEffect, useState } from "react"
const dynamicImport = () => import("react-slick");
import type { Settings, default as ReactSlick } from "react-slick";

const Carousel = memo((
	{ children, className, config = { 
			arrows: true, 
			dots: true 
		} 
	}: { children: React.ReactNode, className: string, config?: Settings}) => {

	const [Slider, setSlider] = useState<typeof ReactSlick | null>(null);

	useEffect(() => {
		import("slick-carousel/slick/slick.css")
		import("slick-carousel/slick/slick-theme.css")
		dynamicImport()
			.then(mod => setSlider(() => mod.default))
			.catch(err => console.error("Fallo al cargar react-slick", err));
	}, []);

	if (!Slider) {
		return <></>;
	}

	const settings: Settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		className,
		autoplay: true,
		...config 
	};

	return (
		<Slider {...settings}>
			{children}
		</Slider>
	);
});

export default Carousel;