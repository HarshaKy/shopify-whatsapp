import WhatsappInformation from '../components/whatsappInfo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Page, Card, Navigation, Frame } from '@shopify/polaris'
import api from '../api'
import TemplatePicker from '../components/template-picker'
import SideNavigation from '../components/Navigation'
import Broadcast from '../components/broadcast'
import { orderDelivered } from '../api/dropdownOptions'


class Index extends React.Component {

    constructor(props) {
        super(props)

        this.handleNavigation = this.handleNavigation.bind(this)

        this.state = {
            componentsToRender: {
                home: false,
                templatePicker: false,
                broadcast: false,
                whatsappInfo: false
            }
        }
    }

    handleNavigation = async (component) => {
        await this.setState({ componentsToRender: { [component]: true }})
        console.log(this.state)
    }

    render() {
        // choose what to render
        // console.log(this.state)
        let itemToRender
        // console.log('hello from index', this.props)
        if (!this.props.shop.shopDb.whatsappCredentials) {
            itemToRender = <WhatsappInformation shop={this.props.shop.shopDb}/>
        } else if (this.state.componentsToRender.home) {
            itemToRender = <div>Home Page</div>
        } else if (this.state.componentsToRender.templatePicker) {
            console.log(orderDelivered)
            itemToRender = <TemplatePicker shop={this.props.shop.shopDb} />
        } else if (this.state.componentsToRender.broadcast) {
            itemToRender = <Broadcast shop={this.props.shop.shopDb}/>
        } else if (this.state.componentsToRender.whatsappInfo) {
            itemToRender = <WhatsappInformation shop={this.props.shop.shopDb} />
        } 
        
        else {
            itemToRender = <div>Home Page</div>
        }

        return (
            <Frame
                navigation={
                    <Navigation location="/">
                        <Navigation.Section
                            items={[
                                {
                                    label: 'Home',
                                    onClick: () => this.handleNavigation('home'),
                                    selected: this.state.home
                                },
                                {
                                    onClick: () => this.handleNavigation('templatePicker'),
                                    label: 'Template Picker',
                                    selected: this.state.templatePicker
                                },
                                {
                                    onClick: () => this.handleNavigation('broadcast'),
                                    label: 'WhatsApp Broadcast',
                                    selected: this.state.broadcast
                                },
                                {
                                    onClick: () => this.handleNavigation('whatsappInfo'),
                                    label: 'WhatsApp Details',
                                    selected: this.state.whatsappInfo
                                }
                            ]}
                        />
                    </Navigation>}
            >
            <Page>
                {itemToRender}
            </Page>
            </Frame>
        )
    }
}

export default Index