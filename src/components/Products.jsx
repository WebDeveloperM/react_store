import React, { useState, useEffect } from 'react';
import Product from "./Product";
import { addProduct } from "../utils/AddProduct";

export default function Products({ products }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [count] = useState(1)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    return (
        <div className="columns is-multiline is-centered">
            {products && products.map(product => (
                <div className="column is-3" key={product.id}>
                    <Product
                        id={product.id}
                        brand={product.attributes.brand.data.attributes.title}
                        name={product.attributes.name}
                        price={product.attributes.price}
                        thumb={product.attributes.image.data.attributes.url}
                        addProduct={addProduct}
                        product={product}
                        cart={cart}
                        setCart={setCart}
                        count={count}
                    />
                </div>
            ))}
        </div>
    );
}

