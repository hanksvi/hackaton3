import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apis/api";
import { useAuth } from "../auth/AuthProvider";

interface Product {
    itemId: string;
    title: string;
    price: number;
    imgUrl: string;
    // Otros campos...
}

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const auth = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/item/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        if (!auth.isAuthenticated) {
            setMessage("Debes iniciar sesión para agregar productos al carrito");
            return;
        }
        try {
            await api.put("/cart", {
                itemId: product?.itemId,
                userId: auth.userId, // Asegúrate de tener userId en el contexto
            });
            setMessage("Producto agregado al carrito");
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            setMessage("Error al agregar al carrito");
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (!product) return <p>Producto no encontrado</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <img src={product.imgUrl} alt={product.title} className="w-full h-96 object-cover mb-4" />
            <p className="text-xl text-gray-700">Precio: ${product.price}</p>
            {/* Otros detalles */}
            <button
                onClick={addToCart}
                className="mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
            >
                Agregar al carrito
            </button>
            {message && <p className="mt-4 text-blue-600">{message}</p>}
        </div>
    );
}