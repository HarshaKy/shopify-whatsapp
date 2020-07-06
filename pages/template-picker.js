import {
   Page, Card, Layout, Select, Subheading
} from '@shopify/polaris'

class TemplatePicker extends React.Component {
    render() {
        return (
            <Page
                    title="Pick templates for events"
                    narrowWidth
                >
            <Card sectioned>
                
                    <Card.Section title="Order Delivered">
                        <Select 
                        
                        />
                    </Card.Section>
                    
                    <Card.Section title="Order Confirmed">
                        <Select 
                        
                        />
                    </Card.Section>

                    <Card.Section title="Abandoned Cart">
                        <Select 
                        
                        />
                    </Card.Section>

                    <Card.Section title="Payment Confirmation">
                        <Select 
                        
                        />
                    </Card.Section>
                
            </Card>
            </Page>
        )
    }
}

export default TemplatePicker