import Head from 'next/head'

const Layout = (props) => (
  <div>
    <Head>
      <title>PairHub</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
    </Head>
    <div className="logo-container">
      <div className="logo">
      </div>
      <div className="brand"></div>
    </div>
    <div className='container'>
      {props.children}
    </div>
  </div>
)

export default Layout
