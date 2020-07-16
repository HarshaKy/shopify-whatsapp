import {
   Button, Page, Card, Layout, Select, Subheading, Form, FormLayout
} from '@shopify/polaris'
import { orderDelivered, orderConfirmed, abandonedCart, paymentConfirmation } from '../api/dropdownOptions'
import api from '../api'
import EventTemplateConnector from '../components/addEventTemplate'

class TemplatePicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            orderDeliveredSelection: orderDelivered[0].value,
            orderConfirmedSelection: orderConfirmed[0].value,
            abandonedCartSelection: abandonedCart[0].value,
            paymentConfirmationSelection: paymentConfirmation[0].value,
            submitButtonDisabledStatus: true,
            addMoreEvents: false
        }
        this.handleOrderDeliveredSelectionChange = this.handleOrderDeliveredSelectionChange.bind(this)
        this.handleOrderConfirmationSelectionChange = this.handleOrderConfirmationSelectionChange.bind(this)
        this.handleAbandonedCartSelectionChange = this.handleAbandonedCartSelectionChange.bind(this)
        this.handlePaymentConfirmationSelectionChange = this.handlePaymentConfirmationSelectionChange.bind(this)
    }

    handleOrderDeliveredSelectionChange = (newValue, id) => this.setState({ orderDeliveredSelection: newValue, submitButtonDisabledStatus: false })
    
    handleOrderConfirmationSelectionChange = (newValue, id) => this.setState({ orderConfirmedSelection: newValue, submitButtonDisabledStatus: false })

    handleAbandonedCartSelectionChange = (newValue, id) => this.setState({ abandonedCartSelection: newValue, submitButtonDisabledStatus: false })

    handlePaymentConfirmationSelectionChange = (newValue, id) => this.setState({ paymentConfirmationSelection: newValue, submitButtonDisabledStatus: false })

    handleSubmit = async () => {
        console.log('saving', this.state)
        await api.setTemplateChoices(this.props.shop._id, this.state).then((res) => {
            if (res.status == 200) {
                this.setState({ submitButtonDisabledStatus: true })
            }
        })
    }

    redirectToAddEventPage = async () => {
        await this.setState({ addMoreEvents: true })
    }
    
    render() {
        console.log('props template picker', this.props)

        if(this.state.addMoreEvents){
            return <EventTemplateConnector shop={this.props.shop}/>
        }
        
        return (
                
            <Form onSubmit={this.handleSubmit}>   
                <FormLayout>
                    <Page
                        title="Pick templates for events"
                        primaryAction={
                            <Button onClick={this.redirectToAddEventPage}>
                                Manage Events and Templates
                            </Button>
                        }
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
                                <Button primary submit disabled={this.state.submitButtonDisabledStatus}>
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