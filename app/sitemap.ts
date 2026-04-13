import { MetadataRoute } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'

const BASE_URL = 'https://docs.harness.design'

function getMdxFiles(dir: string, base = ''): string[] {
  const entries = readdirSync(dir, { withFileTypes: true })
  const paths: string[] = []
  for (const entry of entries) {
    if (entry.isDirectory()) {
      paths.push(...getMdxFiles(join(dir, entry.name), `${base}/${entry.name}`))
    } else if (entry.name.endsWith('.mdx')) {
      const slug =
        entry.name === 'index.mdx'
          ? base
          : `${base}/${entry.name.replace(/\.mdx$/, '')}`
      paths.push(slug || '/')
    }
  }
  return paths
}

export default function sitemap(): MetadataRoute.Sitemap {
  const contentDir = join(process.cwd(), 'content')
  const paths = getMdxFiles(contentDir).filter(p => p !== '/partnership-program')

  return paths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' || path === '/' ? 1.0 : path === '/faq' ? 0.9 : path.startsWith('/legal') ? 0.1 : 0.8,
  }))
}
