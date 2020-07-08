import { Button, Form, Layout, Page, TextStyle, Stack, TextField, FormLayout, Card } from '@shopify/polaris'
import api from '../api'
import { Redirect } from '@shopify/app-bridge/actions'
import { Context } from '@shopify/app-bridge-react'

class WhatsappInformation extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextType = Context
    state = {
        whatsappNumber: '',
        whatsappApiKey: ''
    }

    render() {
        const { whatsappNumber, whatsappApiKey } = this.state
        const app = this.context
        console.log('props', this.props)
        
        const handleSubmit = async () => {
            if (this.state.whatsappApiKey && this.state.whatsappNumber) {
                this.setState({
                    whatsappNumber: this.state.whatsappNumber,
                    whatsappApiKey: this.state.whatsappApiKey
                })
                // console.log('submission', this.state)
                await api.setWhatsappInfo(this.state.whatsappNumber, this.state.whatsappApiKey, this.props.shop._id)
                    .then((res) => {
                        if(res.status == 200) {
                            console.log(res)
                        }
                    })
                    .catch((err) => console.log(err))
            } else {
                alert('Enter values for number and api key')
            }
            
        }

        const handleChange = (field) => {
            return (value) => this.setState({ [field]: value })
        }

        return (
            <Page>
                <Layout>
                    <Layout.AnnotatedSection
                        title="Store details"
                        description="This info will be used to send your customers notifications through WhatsApp."
                    >
                        <Card sectioned>
                            <Form onSubmit={handleSubmit}>
                                <FormLayout>
                                    <TextField
                                        type="whatsappNumber" 
                                        label="WhatsApp Number"
                                        value={whatsappNumber}
                                        onChange={handleChange('whatsappNumber')}
                                    />
                                    <TextField 
                                        type="whatsappApiKey" 
                                        label="WhatsApp API Key"
                                        value={whatsappApiKey}
                                        onChange={handleChange('whatsappApiKey')}
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
}

export default WhatsappInformation