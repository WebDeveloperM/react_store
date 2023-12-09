export const PRODUCTS = 'http://localhost:1337/api/products?populate=category&populate=brand&populate=image'

export const PRODUCT = 'http://localhost:1337/api/products/id?populate=category&populate=brand&populate=image'

export const BRANDS = 'http://localhost:1337/api/brands'

export const CATEGORIES = 'http://localhost:1337/api/categories'

export const ORDER_PRODUCTS = 'http://localhost:1337/api/order-products'

export const ORDER_PRODUCT = 'http://localhost:1337/api/order-products/id?populate=product'

export const ORDERS = 'http://localhost:1337/api/orders?populate=customer&customer=order_products'

export const ORDER = 'http://localhost:1337/api/orders/id?populate=customer&customer=order_products'
