const orderDelivered = [
    {
        label: 'Your order has been delivered!',
        value: 'od1',
    },
    {
        label: 'Hey there! Your order has been successfully delivered!',
        value: 'od2'
    }
]

const orderConfirmed = [
    {
        label: 'Your order has been confirmed!',
        value: 'oc1'
    }, 
    {
        label: 'Your order for {items} has been confirmed. Thank you for shopping with us!',
        value: 'oc2'
    }
]

const abandonedCart = [
    {
        label: 'You have left some items in your cart. Would you like to place an order for them?',
        value: 'ac1'
    },
    {
        label: 'These items in your cart might get sold out soon. Hurry up and place an order.',
        value: 'ac2'
    }
]

const paymentConfirmation = [
    {
        label: 'Your payment of {amount} was made successfully! Sit back and relax while we process your order.',
        value: 'pc1'
    },
    {
        label: 'Payment of {amount} recieved. Your order will be processed soon.',
        value: 'pc2'
    }
]

module.exports = { orderDelivered, orderConfirmed, abandonedCart, paymentConfirmation }