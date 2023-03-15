import Head from 'next/head';

interface MetaSEO {
  title: string;
  keywords: string;
  description: string;
}

const Meta = ({ title, keywords, description }: MetaSEO) => {
  const titleText = `${title} - Token Pass`;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <title>{titleText}</title>
        <meta name="ton-x-name" content={titleText} />
        <meta property="og:title" content={titleText} />
        <meta name="twitter:title" content={titleText} />
        <meta property="twitter:title" content={titleText} />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/ico/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/ico/favicon-32x32.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/ico/favicon-16x16.ico" />
        <meta name="ton-x-image" content={`${process.env.NEXT_PUBLIC_SERVER_URL}/image/logo/logo-green-bg-72x72.png`} />
        <meta property="og:logo" content={`${process.env.NEXT_PUBLIC_SERVER_URL}/image/logo/logo-green-bg-72x72.png`} />
        {/* <meta itemProp="og:logo" content={`${process.env.NEXT_PUBLIC_SERVER_URL}/image/logo/logo-green-bg-72x72.png`} /> */}
        {/* <img itemProp="og:logo" src={`${process.env.NEXT_PUBLIC_SERVER_URL}/image/logo/logo-green-bg-72x72.png`} /> */}
        <meta
          name="twitter:title"
          content={`${process.env.NEXT_PUBLIC_SERVER_URL}/image/logo/logo-green-bg-72x72.png`}
        />
        <meta
          property="twitter:title"
          content={`${process.env.NEXT_PUBLIC_SERVER_URL}/image/logo/logo-green-bg-72x72.png`}
        />
        <meta name="ton-x-theme-color" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="description" content={description} />
        <meta name="ton-x-description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta name="description" content={description} />
        <meta itemProp="description" content={description} />
        {/* <meta name="ton-x-extension" content="GQGDy5PUxXmBl8VAPHFWQDyYWDrPWupfRk8ZUtCdfDc" /> */}
        <meta name="ton-x-name" content="Token Pass" />
        <meta name="ton-x-color" content="#fff" />
        <meta name="ton-x-image" content={`${process.env.NEXT_PUBLIC_SERVER_URL}/image/logo/logo-green-bg-72x72.png`} />
        <meta name="ton-x-description" content={description} />
      </Head>
    </>
  );
};

Meta.defaultProps = {
  title: 'Token Pass',
  keywords: '',
  description: '',
};

export default Meta;
