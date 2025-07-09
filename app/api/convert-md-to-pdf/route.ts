import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { parseMarkdownContent } from "../../../lib/markdown-utils";
import PDFTemplate from "../../../lib/pdf-template";

export async function POST(request: NextRequest) {
  try {
    const { markdown } = await request.json();

    if (!markdown || typeof markdown !== "string") {
      return NextResponse.json(
        { error: "Invalid markdown content" },
        { status: 400 }
      );
    }

    // Parse the markdown content
    const parsedContent = parseMarkdownContent(markdown);

    // Generate PDF buffer  
    const pdfBuffer = await renderToBuffer(PDFTemplate({ content: parsedContent }));

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert markdown to PDF" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message:
        "Markdown to PDF conversion API. Use POST with markdown content.",
    },
    { status: 200 }
  );
}
