import {Navigation} from '@shopify/polaris'

const SideNavigation = (
    <Navigation location="/">
        <Navigation.Section
            items={[
                {
                    url: '/path/to/place',
                    label: 'Home'
                },
                {
                    url: '/path/to/place',
                    label: 'Template Picker'
                },
                {
                    url: '/path/to/place',
                    label: 'Broadcast History'
                },
            ]}
        />
    </Navigation>
)

export default SideNavigation