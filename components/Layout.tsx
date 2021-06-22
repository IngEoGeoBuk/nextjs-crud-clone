import Head from 'next/head';
import Navbar from './Navbar';


const Layout = ({ children } : any ) => {
    return (
        <>
            <Head>
                <title>Note App</title>
            </Head>
            <Navbar />
            {children}
        </>
    )

}

export default Layout;