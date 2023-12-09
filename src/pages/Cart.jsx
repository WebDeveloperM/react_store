import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';


export default function Cart() {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)))

    const removeCartItem = (cartItem) => {
        setCart([...cart.filter(item => cartItem.product.id !== item.product.id)])
    }

    const increase = (cartItem) => {
        setCart(cart.map(item => {
            if (cartItem.product.id === item.product.id) {
                item.count += 1
            }
            return item
        }))
    }

    const decrease = (cartItem) => {
        if (cartItem.count === 1) {
            return removeCartItem(cartItem)
        }

        setCart(cart.map(item => {
            if (cartItem.product.id === item.product.id) {
                item.count -= 1
            }
            return item
        }))
    }




    return (
        <Layout>
            <div className='section'>
                <div className="container">
                    {!cart || cart.length === 0 ? (
                        <h1 className="title is-1 has-text-danger has-text-centered">Empty cart</h1>)
                        : (cart.map(cartItem => (
                            <div className='box' key={cartItem.product.id}>
                                <div className="columns is-12 is-flex is-align-items-center">
                                    <div
                                        className="column is-2 is-clickable">
                                        <img src={`http://localhost:1337${cartItem.product.attributes.image.data.attributes.url}`}
                                            alt="Placeholder image" />
                                    </div>
                                    <div
                                        className="column is-4 is-clickable">
                                        <p className='title is-5'>{cartItem.product.attributes.name}</p>
                                    </div>
                                    <div className="column is-4 is-flex is-align-items-center">
                                        <button
                                            onClick={() => decrease(cartItem)}
                                            className="button is-small">
                                            -
                                        </button>
                                        <span className='title m-4 is-6'>{cartItem.count}</span>
                                        <button
                                            onClick={() => increase(cartItem)}
                                            className="button is-small">
                                            +
                                        </button>
                                    </div>
                                    <div className="column is-flex is-flex-direction-column is-justify-content-center">
                                        <button
                                            className='button is-success mx-1'>
                                            Buy
                                        </button>
                                        <br />
                                        <br />
                                        <button
                                            className='button is-danger mx-1'
                                            onClick={() => removeCartItem(cartItem)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
        </Layout>
    );
}

