import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({ name, brand, price, thumb, id, addProduct, product, cart, setCart, count }) {

    return (
        <div className="card" style={{ maxWidth: '270px' }}>
            <div className="card-image">
                <Link to={`product/${id}`}>
                    <figure className="image">
                        <img src={`http://localhost:1337${thumb}`} alt="Placeholder image" />
                    </figure>
                </Link>

            </div>
            <div className="card-content ">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-5"> {name}</p>
                        <div className="columns is-centered mt-3">
                            <div className="column is-10">
                                <div className="title is-6">
                                    {price} sum
                                </div>
                            </div>
                            <div className="column">
                                <span className="tag is-info is-right">{brand}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="button is-info is-outlined is-fullwidth"
                    onClick={() => addProduct(cart, setCart, product, count)}
                >
                    <ion-icon name='cart-outline' />
                    <span className='mx-2'>
                        Add to cart
                    </span>
                </button>

            </div>
        </div>
    )
        ;
}
