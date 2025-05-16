import { Address } from "~/context/addressStore";

let mockAddresses: Address[] = [
    {
        id: '1',
        name: 'Casa',
        street: 'Av. Principal 123',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '01050',
        country: 'México',
        isDefault: true
    },
    {
        id: '2',
        name: 'Oficina',
        street: 'Paseo de la Reforma 505',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '06500',
        country: 'México',
        isDefault: false
    }
];

export async function getAddress() {
    return mockAddresses;
}