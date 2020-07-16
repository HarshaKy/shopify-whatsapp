import {Page, Card, Layout, Select, TextField, Button} from '@shopify/polaris'
import { toPlainObject } from 'lodash'

class AddNewTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            templateName: null,
            templateText: null,
            event: null
        }
    }

    handleEventSelection = (newValue, id) => {
        this.setState({ event: newValue })
    }

    handleTemplateName = (newValue, id) => {
        this.setState({ templateName: newValue })
    }

    handleTemplateText = (newValue, id) => {
        this.setState({ templateText: newValue })
    }

    handleSave = () => {
        console.log('saving', this.state)
    }

    render () {
        const options = [
            {
                label: 'Cart Create',
                value: 'cartCreate'
            },
            {
                label: 'Checkout Complete',
                value: 'checkoutComplete'
            }
        ]

        return (
            <Page>
                <Layout>
                    <Layout.Section>
                        <Card sectioned title="Add New Templates for Shopify Events">
                            <Card.Section>
                                <Select 
                                    label="Event"
                                    placeholder="Select an Event"
                                    options={options}
                                    value={this.state.event}
                                    onChange={this.handleEventSelection}
                                />
                                <br></br>
                                <TextField 
                                    label="Template Name"
                                    placeholder="Enter a name for your Template"
                                    value={this.state.templateName}
                                    onChange={this.handleTemplateName}
                                />
                                <br></br>
                                <TextField 
                                    multiline={3}
                                    label="Template Text"
                                    placeholder="Enter text for your Template"
                                    value={this.state.templateText}
                                    onChange={this.handleTemplateText}
                                />
                                <br></br>
                                <Button primary onClick={this.handleSave}>
                                    Save
                                </Button>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        )
    }
}

export default AddNewTemplate