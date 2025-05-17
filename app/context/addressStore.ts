
import { create } from 'zustand';

export type Address = {
    id: string,
    number: string,
    name: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    isDefault: boolean
};

type AddressState = {
    address: Address[];
    loading: boolean;
    error: string | null;
    getAddress: () => Promise<void>;
};

export const useAddressStore = create<AddressState>( set => ({
    address: [],
    loading: false,
    error: null,
    getAddress: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch('/api/address');
            const data = await res.json();
            set({ address: data, loading: false });
        } catch (err) {
            set({ error: 'Error al cargar usuarios', loading: false });
        }
    },
}));
