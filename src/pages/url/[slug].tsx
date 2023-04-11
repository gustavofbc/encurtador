import directusPublic from '../../services/directus';
import Head from "next/head"

interface LinksProps {
    data: Array<{
        url: string;
        id: string;
        active: boolean;
    }>
}

export default function ShortcodePage(props: any) {

    return (
        <div>
            <Head>
                <title>Redirect Page</title>
                <meta httpEquiv="refresh" content={`0; URL='${props.data.url}'`} />
            </Head>
            <h1>Redirecting...</h1>
        </div>
    );
}

export async function getStaticPaths() {
    const { data } = await directusPublic.items("urls").readByQuery({
        filter: {
            url: {
                _neq: 'zzzzz'
            }
        },
        limit: 100,
    }) as LinksProps;

    if (!data) {
        return {
            notFound: true,
        }
    }

    const paths = data.map((item) => ({
        params: { slug: item.id },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps(context: any) {
    const data = await directusPublic.items('urls').readOne(context.params.slug);
    if (!data) {
        return {
            notFound: true,
            revalidate: 60,
        };
    }

    return {
        props: { data },
        revalidate: 60,
    };

}

