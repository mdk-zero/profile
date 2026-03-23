import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const slugStr = slug.join("/");
    
    const imagePath = path.join(process.cwd(), "src/content/projects", slugStr, "image.png");
    
    if (fs.existsSync(imagePath)) {
      const buffer = fs.readFileSync(imagePath);
      return new NextResponse(buffer, {
        headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000" },
      });
    }
    
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
