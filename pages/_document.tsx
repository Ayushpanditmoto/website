import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preconnect"
          as="script"
          data-domain="wouldyoubot.gg"
          href="https://stats.wouldyoubot.gg/js/script.js"
        ></link>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context":"http://schema.org",
              "@type":"Organization",
              "name":"Would You Bot",
              "url":"https://wouldyoubot.gg",
              "logo":"https://i.imgur.com/YjwOfOX.png",
              "description":"Elevate your server's engagement with Would You, featuring user voting, daily messages, and customizability. Would You Rather",
              "sameAs":[
                 "https://twitter.com/wouldyoubot",
                 "https://www.youtube.com/@wouldyoubot",
                 "https://top.gg/bot/981649513427111957"
              ],
              "aggregateRating":{
                 "@type":"AggregateRating",
                 "ratingValue":"5",
                 "reviewCount":"31"
              }
           }
  `,
          }}
        ></script>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Would you is a fun little bot for every server! Provide your server with fun little would you questions!"
        />
        <meta
          property="og:description"
          content="Would you is a fun little bot for every server! Provide your server with fun little would you questions!"
        />
        <meta property="og:title" content="Would You | Discord Bot" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="0" />
        <meta name="theme-color" content="#0598F6" />
        <meta name="msapplication-TileColor" content="#0598F6" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
