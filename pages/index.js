import WhatsappInformation from '../components/whatsappInfo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Page, Card } from '@shopify/polaris'
import api from '../api'

const GET_STORE_NAME = gql`
{
    shop {
      url
      name
      email
      primaryDomain{
        host
      }
    }
  }
`
class Index extends React.Component {
    constructor (props) {
        super(props)
        this.shopExists = this.shopExists.bind(this)
        this.handlechange = this.handlechange.bind(this)
        this.state = {
            shopHost: null,
            shopExists: false,
            shopUrl: null,
            shopEmail: null,
            shopName: null,
            shopDb: {}
        }
    }

    // getInitialState() {
    //     return {data: null}
    // }
    handlechange = (shop) => {
        this.setState(() => ({
            shopHost: shop.primaryDomain.host,
            shopUrl: shop.url,
            shopName: shop.name,
            shopEmail: shop.email
        }))
    }

    shopExists = async (shopHost) => {
        var res = await api.getShop(shopHost)
        if(res.data) {return res.data} else {return false}
    }

    createShop = async () => {
        console.log('create shop', this.state)
        let shop = {
            shopUrl: this.state.shopUrl,
            shopHost: this.state.shopHost,
            shopName: this.state.shopName,
            shopEmail: this.state.shopEmail
        }

        await api.createShop(shop).then((res) => {
            console.log('created shop', res)
            return res
        }, (err) => {
            return err
        })

        this.setState({
            shopExists: true,
            shopDb: res
        })
        
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('component update')
        if (prevState.shopHost !== this.state.shopHost) {
            this.shopExists(this.state.shopHost).then(function(res) {
                if(!res) {
                    this.createShop()
                } else {
                    console.log('shop exists', res)
                    this.setState({
                        shopExists: true,
                        shopDb: res
                    })
                }
                
            }.bind(this))
        }
        
    }
    
    render() {

        return (
            <Page>
                <Query query={GET_STORE_NAME}>
                    {({data, loading, error}) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>{error.message}</div>
                        let shopHost = data.shop.primaryDomain.host
                        
                        console.log('state 1', this.state)
                        
                        if (shopHost !== this.state.shopHost) {
                            this.handlechange(data.shop)
                        }
                        
                        console.log('state 2', this.state)
                        
                        if(this.state.shopExists) {
                            console.log(this.state)
                            return (
                                <WhatsappInformation shop={this.state.shopDb}/>
                            )
                        } else {
                            return <div>Loading...</div>
                        }
                    }}
                </Query>
            </Page>
        )
    }
}

export default Index