import App from 'next/app'
import Head from 'next/head'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/styles.css'
import translations from '@shopify/polaris/locales/en.json'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import api from '../api'

const client = new ApolloClient({
	fetchOptions: {
		credentials: 'include',
	  	headers: {
			'Content-Type': 'application/graphql',
	  	}
	}
})

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
class MyApp extends App {
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
            shopDb: {
                _id: null,
                shopEmail: null,
                shopHost: null,
                shopName: null,
                shopUrl: null,
                whatsappCredentials: {
                    whatsappNumber: null,
                    whatsappApiKey: null
                }
            }
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
        let shop = {
            shopUrl: this.state.shopUrl,
            shopHost: this.state.shopHost,
            shopName: this.state.shopName,
            shopEmail: this.state.shopEmail
        }

        await api.createShop(shop).then((res) => {
            this.setState({
                shopExists: true,
                shopDb: res.data
            })
            return res
        }, (err) => {
            return err
        })
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.shopHost !== this.state.shopHost) {
            this.shopExists(this.state.shopHost).then(function(res) {
                if(!res) {
                    this.createShop()
                } else {
                    this.setState({
                        shopExists: true,
                        shopDb: res
                    })
                }
                
            }.bind(this))
        }
        
    }
   
    render() {
        console.log('hello from app')
        const { Component, pageProps } = this.props
        return (
            <React.Fragment>
                <Head>
                    <title>Whatsapp Integration</title>
                    <meta charSet="utf-8" />
                </Head>
                <AppProvider i18n={translations}>
                    <ApolloProvider client={client}>
                        <Query query={GET_STORE_NAME}>
                            {({data, loading, error}) => {
                                if (loading) return <div>Loading...</div>
                                if (error) return <div>{error.message}</div>
                                let shopHost = data.shop.primaryDomain.host
                                
                                if (shopHost !== this.state.shopHost) {
                                    this.handlechange(data.shop)
                                }
                                
                                if(this.state.shopExists) {
                    
                                    return <Component {...pageProps} shop={this.state}/>
                    
                                } else {
                                    return <div>Loading...</div>
                                }
                            }}
                        </Query>
                    </ApolloProvider>
                </AppProvider>
            </React.Fragment>
        )
    }
}

export default MyApp