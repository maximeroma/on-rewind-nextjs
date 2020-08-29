import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo-client'
import styles from '../styles/Index.module.scss'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>On Rewind App </div>
        </div>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}
