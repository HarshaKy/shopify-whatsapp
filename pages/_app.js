import App from 'next/app'
import Head from 'next/head'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/styles.css'
import translations from '@shopify/polaris/locales/en.json'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
	fetchOptions: {
		credentials: 'include',
	  	headers: {
			'Content-Type': 'application/graphql',
	  	}
	}
})

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <React.Fragment>
                <Head>
                    <title>Whatsapp Integration</title>
                    <meta charSet="utf-8" />
                </Head>
                <AppProvider i18n={translations}>
                    <ApolloProvider client={client}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </AppProvider>
            </React.Fragment>
        )
    }
}

export default MyApp