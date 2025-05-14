
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { requireAuth } from '~/utils/auth/auth.server';
import { message, Steps } from 'antd';
import { useState } from 'react';
import Cart from '~/components/Checkout/Cart';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuth(request);
    return json({ userId });
}

const steps = [
    {
        title: 'Mi Carrto',
        content: (next: VoidFunction) => <Cart onNext={next} />,
    },
    {
        title: 'Informacion',
        content:  (next: VoidFunction, prev: VoidFunction) => <h1>Informacion</h1>,
    },
    {
        title: 'Envio y Entrega',
        content:(next: VoidFunction, prev: VoidFunction) => <h1>Envio y Entrega</h1>,
    },
    {
        title: 'Pago',
        content: ( _ : VoidFunction, prev: VoidFunction, done: VoidFunction) => <h1>Pago</h1>,
    },
];

const Checkout: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);
    const done = () => message.success('¡Checkout completado!');

    const items = steps.map(item => ({ key: item.title, title: item.title }));
    const contentStyle: React.CSSProperties = { textAlign: 'center' };

    return (
        <section className='general__container' >
            <Steps className='steps__checkout' current={current} items={items} />
            <div style={contentStyle}>
                {
                    steps[current].content( next, prev, done )
                }
            </div>
        </section>
    );
};

export default Checkout;