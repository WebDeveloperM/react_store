import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams, } from "react-router-dom";
import { ORDERS, ORDER_PRODUCT } from "../urls";
import axios from "axios";

export default function ConfirmOrder() {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const [customer] = useState(JSON.parse(localStorage.getItem('user') || []))

    const [orderProduct, setOrderProduct] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(ORDER_PRODUCT.replace('id', params.productId))
            .then(res => setOrderProduct(res.data.data))
            .catch(err => console.log(err))
    }, [])

    const deleteOrderProduct = () => {
        axios.delete(ORDER_PRODUCT.replace('id', params.productId))
            .then(() => navigate(`/product/${orderProduct.attributes.product.data.id}`))
            .catch(err => console.log(err))
    }
    

    const createOrder = e => {
        e.preventDefault()

        axios.post(ORDERS, {
            data: {
                customer, address, phone,
                total: orderProduct.attributes.total,
                order_products: orderProduct.id
            }
        })
            .then(res => console.log(res, "---------------------------"))
            .catch(err => console.log(err))
    }



    return (
        <Layout>
            <div className="section">
                <div className="columns is-centered">
                    <div className="column">
                        <div className="box">
                            <div className="title has-text-centered">
                                Shipping Information
                            </div>
                            <form className="form" onSubmit={(e) => createOrder(e)}>
                                <div className="field">
                                    <input
                                        type="text"
                                        id='name'
                                        placeholder='Write your name'
                                        className='input'
                                        onInput={event => setName(event.target.value)}
                                        value={name}
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        id='address'
                                        placeholder='Write your address'
                                        className='input'
                                        onInput={event => setAddress(event.target.value)}
                                        value={address} />
                                </div>
                                <div className="field">
                                    <input
                                        type="tel"
                                        id='phone'
                                        placeholder='Write your phone'
                                        className='input'
                                        onInput={event => setPhone(event.target.value)}
                                        value={phone} />
                                </div>
                                <button className='button is-fullwidth is-success my-4' type='submit' >Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div className="box">
                            <div className="columns is-flex is-align-items-center">
                                {orderProduct.attributes && (
                                    <div className="column mt-4">
                                        <p className="title is-2 has-text-left mb-6">Product: {orderProduct.attributes.product.data.attributes.name}
                                        </p>
                                        <p className="subtitle is-size-4 mr-2">
                                            <span className="has-text-weight-bold">
                                                Price:
                                            </span>
                                            {orderProduct.attributes.product.data.attributes.price} sum

                                        </p>
                                        <p className="subtitle is-size-4 mr-2">
                                            <span className="has-text-weight-bold">
                                                Amount:
                                            </span>
                                            x{orderProduct.attributes.amount}

                                        </p>
                                        <p className="subtitle is-size-4 mr-2">
                                            <span className="has-text-weight-bold">
                                                Total:
                                            </span>
                                            {orderProduct.attributes.total} sum
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={deleteOrderProduct}
                                className="button is-warning is-fullwidth">
                                Back to &nbsp; <b>{orderProduct.attributes ? orderProduct.attributes.product.data.attributes.name.slice(0, 30) : ""}</b>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
