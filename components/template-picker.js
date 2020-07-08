import {
   Button, Page, Card, Layout, Select, Subheading, Form, FormLayout
} from '@shopify/polaris'
import { orderDelivered, orderConfirmed, abandonedCart, paymentConfirmation } from '../api/dropdownOptions'

class TemplatePicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            orderDeliveredSelection: orderDelivered[0].value,
            orderConfirmedSelection: orderConfirmed[0].value,
            abandonedCartSelection: abandonedCart[0].value,
            paymentConfirmationSelection: paymentConfirmation[0].value
        }
        this.handleOrderDeliveredSelectionChange = this.handleOrderDeliveredSelectionChange.bind(this)
    }

    handleOrderDeliveredSelectionChange = (newValue, id) => this.setState({ orderDeliveredSelection: newValue })
    
    handleOrderConfirmationSelectionChange = (newValue, id) => this.setState({ orderConfirmedSelection: newValue })

    handleAbandonedCartSelectionChange = (newValue, id) => this.setState({ abandonedCartSelection: newValue })

    handlePaymentConfirmationSelectionChange = (newValue, id) => this.setState({ paymentConfirmationSelection: newValue })

    handleSubmit = () => {
        console.log('saving', this.state)
    }
    

    render() {
        console.log('props template picker', this.props)

        return (
                
            <Form onSubmit={this.handleSubmit}>   
                <FormLayout>
                    <Page
                        title="Pick templates for events"
                    >
                        <Card sectioned>
                            <Card.Section title="Order Delivered">
                                <Select 
                                    options={orderDelivered}
                                    value={this.state.orderDeliveredSelection}
                                    onChange={this.handleOrderDeliveredSelectionChange}
                                    placeholder="Select a template"
                                />
                            </Card.Section>
                    
                            <Card.Section title="Order Confirmed">
                                <Select 
                                    options={orderConfirmed}
                                    value={this.state.orderConfirmedSelection}
                                    onChange={this.handleOrderConfirmationSelectionChange}
                                    placeholder="Select a template"
                                />
                            </Card.Section>

                            <Card.Section title="Abandoned Cart">
                                <Select 
                                    options={abandonedCart}
                                    value={this.state.abandonedCartSelection}
                                    onChange={this.handleAbandonedCartSelectionChange}
                                    placeholder="Select a template"
                                />
                            </Card.Section>

                            <Card.Section title="Payment Confirmation">
                                <Select 
                                    options={paymentConfirmation}
                                    value={this.state.paymentConfirmationSelection}
                                    onChange={this.handlePaymentConfirmationSelectionChange}
                                    placeholder="Select a template"
                                />
                            </Card.Section>

                            <Card.Section>
                                <Button primary submit>
                                    Save
                                </Button>
                            </Card.Section>
                        </Card>
                    </Page>
                </FormLayout>
            </Form>
            
        )
    }
}

export default TemplatePicker