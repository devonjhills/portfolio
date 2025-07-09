import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    // Fetch and encode the logo
    const logoResponse = await fetch(new URL('/logo.png', request.url))
    const logoArrayBuffer = await logoResponse.arrayBuffer()
    const logoBase64 = Buffer.from(logoArrayBuffer).toString('base64')
    const logoDataUrl = `data:image/png;base64,${logoBase64}`

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f0f0f',
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 70%)',
            }}
          />
          
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            alt="Devon Hills Logo"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '24px',
              filter: 'drop-shadow(0 10px 30px rgba(120, 119, 198, 0.3))',
            }}
          />
        </div>
      ),
      {
        width: 600,
        height: 600,
      }
    )
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : 'Unknown error'}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}