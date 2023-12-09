import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { PRODUCT } from "../urls";
import Layout from '../components/Layout';
import { addProduct } from '../utils/AddProduct';
import { Link, useNavigate } from "react-router-dom";
import { ORDER_PRODUCTS } from "../urls";


export default function ProductDetail() {
    const [product, setProduct] = useState()

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    const navigate = useNavigate()

    const createOrderProducts = () => {
        axios.post(ORDER_PRODUCTS, {
            data: {
                amount: 1,
                product: product,
                total: product.attributes.price
            }
        })
            .then(res => navigate(`/order/${res.data.data.id}/1`))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const { id } = useParams()
    console.log(product);
    useEffect(() => {
        axios.get(PRODUCT.replace('id', id))
            .then(res => setProduct(res.data.data))
            .catch(err => console.log(err))
    }, [])

    const image = product ? product.attributes.image.data.attributes.url : ''
    const description = product ? product.attributes.description : ''
    const brand = product ? product.attributes.brand.data.attributes.title : ''
    const name = product ? product.attributes.name : ''
    const price = product ? product.attributes.price : ''

    return (
        <Layout>
            <div className="section">
                <div className="container">
                    <div className="tile is-ancestor">
                        <div className="tile is-vertical">
                            {product && (
                                <div className="tile">
                                    <div className="tile is-parent is-vertical">
                                        <article className="tile is-child notification has-text-centered">
                                            <img
                                                src={`http://localhost:1337${image}`}
                                                alt="404 not found" />
                                        </article>
                                    </div>
                                    <div className="tile is-parent">
                                        <article className="tile is-child notification">
                                            <div className="title is-4">{name}</div>
                                            <div className="subtitle has-text-grey is-spaced">{description}</div>
                                            <div className="title is-4 has-text-success">{price} sum</div>
                                            <div className="content">
                                                <div className="subtitle is-spaced has-text-weight-bold">Brand: {brand}</div>
                                                <button
                                                    onClick={createOrderProducts}
                                                    className="button mr-3 is-primary">
                                                    Buy
                                                </button>

                                                <button
                                                    className="button is-info"
                                                    onClick={() => addProduct(cart, setCart, product, 1)}
                                                >
                                                    Add to card
                                                </button>
                                                <hr className='dropdown-divider my-3' />
                                                <form className="form">
                                                    <input
                                                        type="text"
                                                        className="input my-2"
                                                        placeholder='Leave your review here' />
                                                    <button className='button is-success is-fullwidth my-2' type='submit'>
                                                        Submit
                                                    </button>
                                                    <Link to='/' style={{ textDecoration: 'none' }}>
                                                        <button className='button is-danger is-fullwidth my-2'>
                                                            Back to main
                                                        </button>
                                                    </Link>
                                                </form>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            )}
                            <div className="tile is-parent">
                                <article className="tile is-child notification">
                                    <div className="content">
                                        <div className="title has-text-centered">
                                            Reviews of other clients
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
