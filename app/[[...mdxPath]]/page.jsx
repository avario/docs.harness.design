import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
    const params = await props.params
    const { metadata } = await importPage(params.mdxPath)
    const ogPath = params.mdxPath?.join('/') ?? ''
    return {
        ...metadata,
        openGraph: {
            type: 'article',
            siteName: 'harness.design docs',
            title: metadata.title,
            description: metadata.description,
            images: [`/og?path=${ogPath}`],
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title,
            description: metadata.description,
            images: [`/og?path=${ogPath}`],
        },
    }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
    const params = await props.params
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata } = result
    return (
        <Wrapper toc={toc} metadata={metadata}>
            <MDXContent {...props} params={params} />
        </Wrapper>
    )
}