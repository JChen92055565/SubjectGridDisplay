import '../styles/globals.css'; // Global styles
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // This is where you can provide context or global state to your components
  // You can also pass props to all your pages
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;