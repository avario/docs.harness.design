import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { importPage } from 'nextra/pages'
import { readFile } from 'fs/promises'
import nodePath from 'path'

export const runtime = 'nodejs'

const size = { width: 1200, height: 630 }
const BRAND_COLORS = ['#40C057', '#FCC419', '#FB7E15', '#FB5252', '#7A50F3']

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
  const mdxPath = path ? path.split('/') : undefined

  const { metadata } = await importPage(mdxPath)

  const title = (metadata?.title ?? 'harness.design docs').replace(/ [—–] .*$/, '')
  const description = metadata?.description ?? ''

  const [interFont, bgImageData] = await Promise.all([
    readFile(nodePath.join(process.cwd(), 'public/fonts/Inter-SemiBold.ttf')),
    readFile(nodePath.join(process.cwd(), 'public/og-background.png')).catch(() => null),
  ])

  const bgStyle = bgImageData
    ? {
        backgroundImage: `url(data:image/png;base64,${bgImageData.toString('base64')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor: '#0a0a0a' }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          ...bgStyle,
        }}
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {BRAND_COLORS.map(c => (
            <div key={c} style={{ width: 32, height: 4, backgroundColor: c, borderRadius: 2 }} />
          ))}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: 16,
            fontFamily: 'Inter',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#999999',
            lineHeight: 1.5,
            maxWidth: 800,
            fontFamily: 'Inter',
          }}
        >
          {description}
        </div>
        <div style={{ marginTop: 48, fontSize: 20, color: '#555555', fontFamily: 'Inter' }}>
          docs.harness.design
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: interFont, weight: 600 }],
    }
  )
}
