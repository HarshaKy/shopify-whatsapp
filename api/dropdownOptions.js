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

const events = [
    {
        label: 'Order Shipped',
        value: 'orderShipped'
    },
    {
        label: 'Checkout Complete',
        value: 'checkoutComplete'
    }
]

const templates = [
    {
        label: 'checkout1',
        value: 'checkout1',
        text: 'Hey {{name}}. Your checkout process has been completed successfully. Your order ID is {{orderid}}',
        event: 'checkoutComplete'
    },
    {
        label: 'checkout2',
        value: 'checkout2',
        text: 'Your checkout process has been completed successfully. Your order ID is {{orderid}}.',
        event: 'checkoutComplete'
    },
    {
        label: 'shipped1',
        value: 'shipped1',
        text: 'Hey {{name}}. Your order with order ID {{orderid}} has been shipped. Our delivery executive will contact you at {{phone}} before delivering.',
        event: 'orderShipped'
    },
    {
        label: 'shipped2',
        value: 'shipped2',
        text: 'Hey {{name}}. Your order with order ID {{orderid}} has been shipped.',
        event: 'orderShipped'
    }
]

const shopifyFields = [
    {
        label: 'name',
        value: 'name'
    },
    {
        label: 'orderid',
        value: 'orderid'
    },
    {
        label: 'address',
        value: 'address'
    },
    {
        label: 'phone',
        value: 'phone'
    }
]

const getTemplatesForEvent = (event) => {
    var templatesFound = templates.filter(function(template) {
        return template.event == event
    })

    return templatesFound
}

const getTemplateText = (templateName) => {
    var templateFound = templates.filter(function(template) {
        return template.value == templateName
    })

    return templateFound[0].text
}

module.exports = { orderDelivered, orderConfirmed, abandonedCart, paymentConfirmation, events, templates, shopifyFields, getTemplatesForEvent, getTemplateText }