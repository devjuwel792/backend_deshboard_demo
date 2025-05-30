import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import '../i18n';

function MyApp({ Component, pageProps }) {
    // const { i18n } = useTranslation();

    // useEffect(() => {
    //     document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    // }, [i18n.language]);

    return <Component {...pageProps} />;
}

export default MyApp;
