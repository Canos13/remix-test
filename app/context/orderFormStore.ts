
import { create } from 'zustand';
import { CartItem } from './cartStore';
import { User } from './authStore';
import { Address } from './addressStore';

export type orderFormType = {
    items?: CartItem[] | null
    clientProfileData?: User | null
    shippingData: Address | null
};

type OrderFormState = {
    orderForm: orderFormType;
    updateOrderForm: (orderFormData: orderFormType) => void;
    
};

export const useOrderFormStore = create<OrderFormState>( set => ({
    orderForm: {
        items: null,
        clientProfileData: null,
        shippingData: null
    },
    updateOrderForm: (orderFormData) => {
        set({ orderForm: orderFormData });
    },
}));