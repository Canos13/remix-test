
export type Product = {
    name: string;
    description: string;
    listPrice: number;
    price: number;
    image: string;
    availability: boolean;
    stock: number;
    isNational: boolean;
    shippingCost: number;
    sapCode: string;
    id: number
};

export type Category = {
    name: string;
    id: string;
    products: Product[];
};

export const dummyData: Category[] = [
    {
        name: "Analgésicos",
        id: "analgesicos",
        products: [
            {
                name: "Paracetamol 500mg Alivio del dolor y la fiebre Alivio del dolor y la fiebre Alivio",
                description: "Alivio del dolor y la fiebre",
                id: 34232,
                listPrice: 20.00,
                price: 15.00,
                image: "https://www.tempra.com.mx/static/754245cbb05fab5a0992a38575208e59/ec333/tempra-500mg-20t_i.png",
                availability: true,
                stock: 200,
                isNational: true,
                shippingCost: 10,
                sapCode: "MED-001"
            },
            {
                name: "Ibuprofeno 400mg",
                id: 95678,
                description: "Antiinflamatorio y analgésico",
                listPrice: 25.00,
                price: 25.00,
                image: "https://www.fahorro.com/media/catalog/product/7/5/7502276853548_1.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=190&width=152&canvas=152:190&format=jpeg",
                availability: true,
                stock: 150,
                isNational: true,
                shippingCost: 12,
                sapCode: "MED-002"
            }
        ]
    },
    {
        name: "Antibióticos",
        id: "antibioticos",
        products: [
            {
                name: "Amoxicilina 500mg",
                description: "Tratamiento de infecciones bacterianas",
                listPrice: 60.00,
                price: 50.00,
                image: "https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/7501349021570.jpg?scale=500&qlty=75",
                availability: true,
                stock: 100,
                id: 4645,
                isNational: false,
                shippingCost: 20,
                sapCode: "MED-003"
            },
            {
                name: "Azitromicina 500mg",
                description: "Antibiótico de amplio espectro",
                listPrice: 65.00,
                price: 60.00,
                image: "https://www.fahorro.com/media/catalog/product/7/5/7502223708921.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg",
                availability: false,
                stock: 0,
                id: 58658,
                isNational: false,
                shippingCost: 25,
                sapCode: "MED-004"
            }
        ]
    },
    {
        name: "Antihistamínicos",
        id: "antihistaminicos",
        products: [
            {
                name: "Loratadina 10mg",
                description: "Alivio de alergias y rinitis",
                listPrice: 18.00,
                id: 56767,
                price: 18.00,
                image: "https://www.movil.farmaciasguadalajara.com/wcsstore/FGCAS/wcs/products/1282883_A_1280_AL.jpg",
                availability: true,
                stock: 250,
                isNational: true,
                shippingCost: 8,
                sapCode: "MED-005"
            },
            {
                name: "Cetirizina 10mg",
                description: "Tratamiento para alergias",
                listPrice: 22.00,
                price: 22.00,
                image: "https://www.movil.farmaciasguadalajara.com/wcsstore/FGCAS/wcs/products/1183460_A_1280_AL.jpg",
                availability: true,
                stock: 180,
                isNational: true,
                id: 86723,
                shippingCost: 10,
                sapCode: "MED-006"
            }
        ]
    },
    {
        name: "Gastrointestinales",
        id: "gastrointestinales",
        products: [
            {
                name: "Omeprazol 20mg",
                description: "Protector gástrico para reflujo",
                listPrice: 45.00,
                price: 30.00,
                image: "https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/7502216792920.jpg?scale=500&qlty=75",
                availability: true,
                stock: 300,
                id: 563683,
                isNational: true,
                shippingCost: 12,
                sapCode: "MED-007"
            },
            {
                name: "Ranitidina 150mg",
                description: "Reducción de la acidez estomacal",
                listPrice: 28.00,
                price: 28.00,
                image: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750110976494L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
                availability: false,
                stock: 0,
                isNational: false,
                id: 896765,
                shippingCost: 15,
                sapCode: "MED-008"
            }
        ]
    }
]

