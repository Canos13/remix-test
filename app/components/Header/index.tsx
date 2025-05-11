
import { Link } from "@remix-run/react";
import Carrousel from '../Carrousel'
import type { Settings } from "react-slick";
import MiniCart from "../Minicart";


const Header = () => {
    const config: Settings = {
        arrows: false,
        dots: false
    }

    return (
        <header className='container__header__full' >
            <div className="carrousel__header__info__">

                <Carrousel config={config} className="carrousel__header__info">
                    <h2 className="carrousel__header__info__text" >¡Cada día estamos más cerca de ti!</h2>
                    <h2 className="carrousel__header__info__text">Atención a clientes: 800 0726 722</h2>
                    <h2 className="carrousel__header__info__text">¡Disfruta de envío gratis en Toluca y Metepec!</h2>
                </Carrousel>
            </div>

            <section className="container__header" >
                <div>
                    <Link className="link__logo__header" to="/" prefetch="intent">
                        <img className='logo__header' src="/arquivos/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div>
                    <MiniCart /> 
                </div>
            </section>
        </header>
    )
}

export default Header