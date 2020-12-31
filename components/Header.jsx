import Head from "next/head";

export default function Header({ title, description = "Determining the best snack thorughout 2021" }) {
    return (
        <Head>
            <title>{title}</title>
            <meta
                name="description"
                content={description}
            />

            <meta
                property="og:url"
                content="https://the-snacket.herokuapp.com/"
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta
                property="og:description"
                content={description}
            />
            <meta
                property="og:image"
                content="https://static.onecms.io/wp-content/uploads/sites/35/2018/01/03222555/wide-puffed-snacks-bags.jpg"
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta
                property="twitter:domain"
                content="the-snacket.herokuapp.com"
            />
            <meta
                property="twitter:url"
                content="https://the-snacket.herokuapp.com/"
            />
            <meta name="twitter:title" content={title} />
            <meta
                name="twitter:description"
                content={description}
            />
            <meta
                name="twitter:image"
                content="https://static.onecms.io/wp-content/uploads/sites/35/2018/01/03222555/wide-puffed-snacks-bags.jpg"
            />

            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
