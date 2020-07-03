import { Button, Form, Layout, Page, TextStyle, Stack, TextField, FormLayout, Card } from '@shopify/polaris'
import api from '../api'

class Index extends React.Component {

    state = {
        whatsappNumber: '',
        whatsappApiKey: ''
    }

    render() {
        const { whatsappNumber, whatsappApiKey } = this.state

        return (
            <Page>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Store details"
                        description="This info will be used to send your customers notifications through WhatsApp."
                    >
                        <Card sectioned>
                            <Form onSubmit={this.handleSubmit}>
                                <FormLayout>
                                    <TextField 
                                        type="whatsappNumber" 
                                        label="WhatsApp Number"
                                        value={whatsappNumber}
                                        onChange={this.handleChange('whatsappNumber')}
                                    />
                                    <TextField 
                                        type="whatsappApiKey" 
                                        label="WhatsApp API Key"
                                        value={whatsappApiKey}
                                        onChange={this.handleChange('whatsappApiKey')}
                                    />
                                    <Stack distribution="trailing">
                                        <Button primary submit>
                                            Save
                                        </Button>
                                    </Stack>
                                </FormLayout>
                            </Form>
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </Page>
        )
    }

    handleSubmit = async () => {
        this.setState({
            whatsappNumber: this.state.whatsappNumber,
            whatsappApiKey: this.state.whatsappApiKey
        })
        console.log('submission', this.state)
        var res = await api.getHello()
        console.log('response', res)
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value })
    }
}

export default Index