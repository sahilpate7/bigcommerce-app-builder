import { Box, GlobalStyles } from '@bigcommerce/big-design';
import Header from '../components/header';
import type { AppProps } from 'next/app';
import SessionProvider from '../context/session';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyles />

        {/* BEGIN NEW CODE */}
        <Box marginHorizontal="xxxLarge" marginVertical="xxLarge">
            <Header />
            <SessionProvider>
                <Component {...pageProps} />
            </SessionProvider>
        </Box>
        {/* END NEW CODE */}

    </>
);
  
 export default MyApp;