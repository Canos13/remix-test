// app/components/LoginPopoverContent.tsx
import { Form, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import { Button, Input, Space, message } from 'antd';

export const LoginPopoverContent = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isSubmitting = navigation.state === 'submitting';

    const handleSubmit = (e: React.FormEvent) => {
        if (!email || !password) {
            e.preventDefault();
            setError('Por favor completa todos los campos');
            message.error('Por favor completa todos los campos');
            return;
        }
    };

    return (
        <div style={{ width: 300, padding: 16 }}>
            <Form
                method="post"
                action="/auth/login"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="redirectTo" value="/profile" />

                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: 8 }}>
                            Correo Electrónico
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="cano@gmail.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: 8 }}>
                            Contraseña
                        </label>
                        <Input.Password
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="mipass2024"
                            required
                        />
                    </div>

                    {error && (
                        <div style={{ color: 'red', fontSize: 12 }}>
                            {error}
                        </div>
                    )}

                    <Button
                        htmlType="submit"
                        type="primary"
                        block
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        Iniciar Sesión
                    </Button>
                </Space>
            </Form>
        </div>
    );
};