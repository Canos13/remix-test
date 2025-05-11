import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Tabs } from 'antd';
import { Card } from 'react-bootstrap';
import MyAccount from '~/components/Profile/MyAccount';
import { useAuthStore } from '~/context/authStore';
import { requireAuth } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuth(request);
    return json({ userId });
}

const tabsProfile = [
    {
        name: "Perfíl",
        class: "__myaccount",
        content: <MyAccount />
    },
    {
        name: "Direcciones",
        class: "__address",
        content: <MyAccount />
    },
    {
        name: "Pedidos",
        class: "__orders",
        content: <MyAccount />
    },
    {
        name: "Facturación",
        class: "__billing",
        content: <MyAccount />
    }
]

export default function Dashboard() {
    const data = useLoaderData<typeof loader>();
    const user = useAuthStore(state => state.user);

    if (!data.userId) return <></>;

    return (
        <div className='main__profile__shop' style={{ padding: 24 }}>
            <h1 className='main__profile__shop__title' >Mi cuenta</h1>
            <p className='main__profile__shop__name'>Bienvenido {user?.name}</p>

            <section className='card__custom__styles'>

                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                    style={{ height: "100%" }}
                    items={
                        tabsProfile.map(item => ({
                            label: (
                                <h4 className={`tab__item__profile tab__item__profile${item.class}`}>
                                    {item.name}
                                </h4>
                            ),
                            key: item.name,
                            children: item.content,
                        }))
                    }
                />

            </section>
        </div>
    );
}