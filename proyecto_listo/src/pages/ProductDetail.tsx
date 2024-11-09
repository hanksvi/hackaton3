// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apis/api";
import { useAuth } from "../auth/AuthProvider";

interface Product {
    itemId?: string;
    title: string;
    price: number;
    imgUrl: string;
    boughtInLastMonth: number;
    isBestSeller: boolean;
    stars: number;
}

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(!!id);
    const [message, setMessage] = useState<string | null>(null);
    const auth = useAuth();

    // Estados para los campos del nuevo producto
    const [newProduct, setNewProduct] = useState<Product>({
        title: "",
        price: 0,
        imgUrl: "",
        boughtInLastMonth: 0,
        isBestSeller: false,
        stars: 0,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await api.get(`/item/${id}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error("Error al obtener el producto:", error);
                }
                setLoading(false);
            }
        };
        
        if (id) {
            fetchProduct();
        } else {
            setLoading(false);
        }
    }, [id]);

    const addToCart = async () => {
        if (!auth.isAuthenticated) {
            setMessage("Debes iniciar sesión para agregar productos al carrito");
            return;
        }
        try {
            await api.put("/cart", {
                itemId: product?.itemId,
                userId: auth.userId,
            });
            setMessage("Producto agregado al carrito");
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            setMessage("Error al agregar al carrito");
        }
    };

    const registerProduct = async () => {
        if (!auth.isAuthenticated) {
            setMessage("Debes iniciar sesión para registrar productos");
            return;
        }

        try {
            await api.post("/item", {
                title: newProduct.title,
                price: newProduct.price,
                imgUrl: newProduct.imgUrl,
                boughtInLastMonth: newProduct.boughtInLastMonth,
                isBestSeller: newProduct.isBestSeller,
                stars: newProduct.stars,
            });
            setMessage("Producto registrado exitosamente");
            setNewProduct({ title: "", price: 0, imgUrl: "", boughtInLastMonth: 0, isBestSeller: false, stars: 0 });
        } catch (error: any) {
            if (error.response) {
                setMessage(`Error al registrar el producto: ${error.response.data.message || error.response.statusText}`);
            } else {
                setMessage("Error al registrar el producto: Verifique los datos e intente nuevamente.");
            }
            console.error("Error al registrar el producto:", error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (!product && id) return <p>Producto no encontrado</p>;

    return (
        <div>
            {id && product ? (
                <>
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <img src={product.imgUrl} alt={product.title} className="w-full h-96 object-cover mb-4" />
                    <p className="text-xl text-gray-700">Precio: ${product.price}</p>
                    <button
                        onClick={addToCart}
                        className="mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                    >
                        Agregar al carrito
                    </button>
                </>
            ) : (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Producto</h2>
                    <input
                        type="text"
                        placeholder="Título del producto"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="URL de la imagen"
                        value={newProduct.imgUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, imgUrl: e.target.value })}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="number"
                        placeholder="Compras en el último mes"
                        value={newProduct.boughtInLastMonth}
                        onChange={(e) => setNewProduct({ ...newProduct, boughtInLastMonth: parseInt(e.target.value) })}
                        className="border p-2 w-full mb-2"
                    />
                    <label className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={newProduct.isBestSeller}
                            onChange={(e) => setNewProduct({ ...newProduct, isBestSeller: e.target.checked })}
                            className="mr-2"
                        />
                        Producto más vendido
                    </label>
                    <input
                        type="number"
                        placeholder="Estrellas (0 a 5)"
                        value={newProduct.stars}
                        onChange={(e) => setNewProduct({ ...newProduct, stars: parseInt(e.target.value) })}
                        className="border p-2 w-full mb-2"
                    />
                    <button
                        onClick={registerProduct}
                        className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    >
                        Registrar Producto
                    </button>
                </div>
            )}
            {message && <p className="mt-4 text-blue-600">{message}</p>}
        </div>
    );
}
