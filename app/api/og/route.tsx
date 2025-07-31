import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "Devon Hills";
    const role = searchParams.get("role") || "Software Engineer";
    const description =
      searchParams.get("description") ||
      "Full-stack software engineer specializing in modern web technologies, AI/ML integration, and scalable applications.";

    // Fetch and encode the logo
    const logoResponse = await fetch(new URL("/logo.png", request.url));
    const logoArrayBuffer = await logoResponse.arrayBuffer();
    const logoBase64 = Buffer.from(logoArrayBuffer).toString("base64");
    const logoDataUrl = `data:image/png;base64,${logoBase64}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f0f0f",
            background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
            position: "relative",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "900px",
              textAlign: "center",
              padding: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "8px",
                lineHeight: "1.2",
              }}
            >
              {name}
            </h1>

            <h2
              style={{
                fontSize: "36px",
                fontWeight: "500",
                color: "#7877c6",
                marginBottom: "24px",
                lineHeight: "1.2",
              }}
            >
              {role}
            </h2>

            <p
              style={{
                fontSize: "24px",
                color: "#a1a1aa",
                lineHeight: "1.4",
                marginBottom: "40px",
              }}
            >
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {["React", "Next.js", "TypeScript", "Python", "AI/ML"].map(
                (tech) => (
                  <div
                    key={tech}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "rgba(120, 119, 198, 0.2)",
                      border: "1px solid rgba(120, 119, 198, 0.3)",
                      borderRadius: "20px",
                      color: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {tech}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Bottom Brand */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoDataUrl}
              alt="Devon Hills Logo"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
              }}
            />
            <span
              style={{
                color: "#a1a1aa",
                fontSize: "18px",
              }}
            >
              devonhills.dev
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : "Unknown error"}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
