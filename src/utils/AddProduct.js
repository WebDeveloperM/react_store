export function addProduct(cart, setCart, product, count) {
    const hasItem = cart.filter(item => item.product.id === product.id)[0]

    if (hasItem) {
        setCart([...cart.filter(item => item.product.id !== hasItem.product.id), {
            ...hasItem,
            count: hasItem.count + count
        }])
    } else {
        setCart([...cart, { product, count }])
    }
}
