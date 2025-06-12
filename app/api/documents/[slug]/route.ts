import { type NextRequest, NextResponse } from "next/server"
import { documentContent } from "@/lib/document-content"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params

  // Get content for the document
  const content = documentContent[slug as keyof typeof documentContent]

  if (!content) {
    return new NextResponse("Document not found", { status: 404 })
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>NADUPA AFRICA FOUNDATION - ${slug.replace(/-/g, " ").toUpperCase()}</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          margin: 0; 
          padding: 40px; 
          line-height: 1.6; 
          background: #fff;
        }
        .header { 
          text-align: center; 
          margin-bottom: 40px; 
          border-bottom: 3px solid #059669; 
          padding-bottom: 20px; 
        }
        .logo { 
          color: #059669; 
          font-size: 28px; 
          font-weight: bold; 
          margin-bottom: 10px;
        }
        .title { 
          font-size: 32px; 
          font-weight: bold; 
          margin: 20px 0; 
          color: #1f2937;
        }
        .subtitle {
          font-size: 16px;
          color: #6b7280;
          font-style: italic;
        }
        .section { 
          margin: 40px 0; 
          page-break-inside: avoid;
        }
        .section h2 { 
          color: #059669; 
          border-bottom: 2px solid #059669; 
          padding-bottom: 10px; 
          font-size: 24px;
        }
        .section h3 {
          color: #374151;
          font-size: 18px;
          margin-top: 25px;
        }
        .stats { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 20px; 
          margin: 30px 0; 
        }
        .stat { 
          text-align: center; 
          padding: 25px; 
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); 
          border-radius: 12px; 
          border: 1px solid #bbf7d0;
        }
        .stat-number { 
          font-size: 36px; 
          font-weight: bold; 
          color: #059669; 
          display: block;
        }
        .stat-label { 
          font-size: 14px; 
          color: #374151; 
          margin-top: 8px;
        }
        .footer { 
          margin-top: 60px; 
          text-align: center; 
          font-size: 12px; 
          color: #6b7280; 
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
        blockquote {
          border-left: 4px solid #059669;
          padding-left: 20px;
          margin: 25px 0;
          font-style: italic;
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
        }
        @media print {
          body { margin: 20px; }
          .header { page-break-after: avoid; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">NADUPA AFRICA FOUNDATION</div>
        <div class="title">${slug.replace(/-/g, " ").toUpperCase()}</div>
        <div class="subtitle">Transforming Lives, Building Communities</div>
      </div>
      ${content}
      <div class="footer">
        <p><strong>© 2024 NADUPA AFRICA FOUNDATION</strong></p>
        <p>Email: info@nadupaafricafoundation.org | Website: www.nadupaafricafoundation.org</p>
        <p>Generated on ${new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
      </div>
    </body>
    </html>
  `

  return new NextResponse(htmlContent, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="${slug}.html"`,
    },
  })
}
