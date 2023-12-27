import Head from 'next/head'

const PortfolioHead = () => {
   return (
      <Head>
         <title>Sunny Sahsi - Software Engineer</title>
         <meta
            name="description"
            content="Portfolio of Sunny Sahsi, a software engineer from India."
         />

         <meta property="og:title" content="Sunny Sahsi - Software Engineer" />
         <meta
            property="og:description"
            content="Portfolio of Sunny Sahsi, a software engineer from India."
         />
         {/* <meta property="og:image" content="URL_TO_YOUR_PROFILE_PICTURE" /> */}
         <meta property="og:url" content="https://sahsisunny.netlify.app" />

         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content="Sunny Sahsi - Software Engineer" />
         <meta name="twitter:creator" content="@sahsisunny" />
         <meta
            name="twitter:description"
            content="Portfolio of Sunny Sahsi, a software engineer from India."
         />
         {/* <meta name="twitter:image" content="URL_TO_YOUR_PROFILE_PICTURE" /> */}

         <link rel="email" href="mailto:sahsisunny@gmail.com" />
         <link rel="phone" href="tel:+917759925544" />
         <link rel="linkedin" href="https://www.linkedin.com/in/sahsisunny" />
         <link rel="github" href="https://github.com/sahsisunny" />
         <link rel="twitter" href="https://twitter.com/sahsisunny" />
         <link rel="website" href="https://sahsisunny.netlify.app" />

         <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
         />
      </Head>
   )
}

export default PortfolioHead
