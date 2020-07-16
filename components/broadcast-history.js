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

const rows = [
    ['02-06-2020', '1:40 PM', 'A1', 140, 98],
    ['01-02-2020', '2:30 AM', 'D3', 10, 8],
    ['09-01-2020', '10:13 PM', 'A1', 40, 38],
    ['03-11-2020', '9:55 PM', 'C1', 46, 41]
];

class BroadcastHistory extends React.Component {
    render () {
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
                                        labelInline
                                    />
                                    <br></br>
                                    <Select
                                        label='Template'
                                        labelInline
                                    />
                                    <br></br>
                                    {true ? 
                                        <TextField
                                            multiline={3}

                                        > 
                                        </TextField> : 
                                        ''
                                    }
                                    
                                    
                                </Card.Section>
                                <Card.Section>
                                    <Button primary>
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

export default BroadcastHistory