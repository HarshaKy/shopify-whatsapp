import {
    Page,
    Card,
    DataTable
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
            <Page title="Boradcast History">
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
            </Page>
        )
    }
}

export default BroadcastHistory