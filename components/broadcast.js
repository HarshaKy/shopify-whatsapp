import {
    Page,
    Card,
    DataTable,
    Layout,
    Button,
    Select,
    TextField,
    Stack,
    DisplayText
} from '@shopify/polaris'
import {
    users,
    userGroups,
    broadcastTemplates,
    getUsersForUserGroup,
    getBroadcastTemplateText
} from '../api/dropdownOptions'
import api from '../api'

const rows = [
    ['02-06-2020', '1:40 PM', 'A1', 140, 98],
    ['01-02-2020', '2:30 AM', 'D3', 10, 8],
    ['09-01-2020', '10:13 PM', 'A1', 40, 38],
    ['03-11-2020', '9:55 PM', 'C1', 46, 41]
];

class Broadcast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            broadcastMessageText: '',
            broadcastMessageName: '',
            userGroup: '',
            variables: [],
            parameters: {},
            tempBroadcastmessage: ''
        }
    }

    handleUserGroup = (newValue, id) => {
        this.setState({ userGroup: newValue })
    }

    handleBroadcastMessageName = async (newValue, id) => {
        console.log('handleBroadcastmessagename')
        let broadcastMessageText = await getBroadcastTemplateText(newValue)
        this.setState({ broadcastMessageName: newValue, broadcastMessageText: broadcastMessageText, tempBroadcastmessage: broadcastMessageText, parameters: {} })

        await api.getTemplateVariables(this.state.broadcastMessageText)
                .then((res) => {
                    if(res.data.length > 0) {
                        this.setState({ variables: res.data })
                    } else {
                        this.setState({ variables: [] })
                    }
                }, (err) => {
                    console.log(err)
                })
    }

    broadcast = () => {
        console.log(this.state)
    }

    render () {

        const handleParameterValue = (variable) => {
            return(newValue) => {
                let varValJson = this.state.parameters
                varValJson[variable] = newValue
                this.setState({ parameters: varValJson })
                api.insertValueInTemplate(this.state.tempBroadcastmessage, this.state.parameters)
                    .then((res) => {
                        this.setState({ broadcastMessageText: res.data })
                    })
            }
        } 

        return (
            <Page 
                title="WhatsApp Broadcast"
                primaryAction={
                    <Button>
                        Manage Templates
                    </Button>
                }
            >
                <Stack spacing="loose" vertical={true}>
                    <Layout>
                        <Layout.Section>
                            <Card title="Broadcast" sectioned>
                                <Card.Section>
                                    <Select
                                        label='User Group'
                                        options={userGroups}
                                        value={this.state.userGroup}
                                        onChange={this.handleUserGroup}
                                        placeholder='Select a user group'
                                    />
                                    <br></br>
                                    <Select
                                        label='Template'
                                        options={broadcastTemplates}
                                        value={this.state.broadcastMessageName}
                                        onChange={this.handleBroadcastMessageName}
                                        placeholder='Select a message template'
                                    />
                                    <br></br>
                                    {true ? 
                                        <TextField
                                            multiline={3}
                                            readOnly
                                            value={this.state.broadcastMessageText}
                                            placeholder='Template text will appear here'
                                        > 
                                        </TextField> : 
                                        ''
                                    }
                                    
                                    <br></br>
                                    {
                                        this.state.variables.map((variable) => {
                                            return (
                                                <div key={variable}>
                                                    <TextField 
                                                        label={variable}
                                                        key={variable}
                                                        placeholder='Enter value for parameter'
                                                        value={this.state.parameters[variable]}
                                                        onChange={handleParameterValue(variable)}
                                                    />
                                                    <br></br>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </Card.Section>
                                <Card.Section>
                                    <Button primary onClick={this.broadcast}>
                                        Broadcast Now
                                    </Button>
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card sectioned title="List of Users">
                            </Card>
                        </Layout.Section>
                    </Layout>
                    <DisplayText size="large">Broadcast History</DisplayText>
                    <Card>
                        <DataTable 
                            columnContentTypes={[
                                'text',
                                'text',
                                'text',
                                'numeric',
                                'numeric'
                            ]}
                            headings={[
                                'Date',
                                'Time',
                                'Template',
                                'Delivered',
                                'Read'
                            ]}
                            rows={rows}
                        />
                    </Card>
                </Stack>
            </Page>
        )
    }
}

export default Broadcast