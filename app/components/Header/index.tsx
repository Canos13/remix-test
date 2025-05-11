
import { Form, Link, useLoaderData } from "@remix-run/react";
import Carrousel from '../Carrousel'
import type { Settings } from "react-slick";
import MiniCart from "../Minicart";
import { Popover } from "antd";
interface HeaderProps {
    userId?: string;
}

const Header = ({ userId }: HeaderProps) => {
    const isAuthenticated = !!userId;

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
                <div className="header__actions">
                    <div>
                        {
                            isAuthenticated ? (
                                <Popover placement="bottom" content={
                                    <Form className="form__actions__loggedIn" action="/auth/logout" method="post">
                                        <Link to="/profile" className="header__btn__profile">Ir a mi perfíl</Link >
                                        <button className="header__btn__logout" type="submit">
                                            Cerrar Sesión
                                        </button>
                                        
                                    </Form>
                                } trigger="hover">
                                    <button className="header__btn__login">Hola</button>
                                </Popover>
                            ) : <Link to="/login" className="header__btn__login">Iniciar Sesión</Link >
                        }

                    </div>
                    <MiniCart />
                </div>
            </section>
        </header>
    )
}

export default Header