import { NextRequest, NextResponse } from "next/server";
import { readProjectImage } from "@/lib/projects";

// /api/project-image/<slug>/<version>. Only the current version is served, so the
// year-long cache is safe and made-up versions can't fill the image optimizer cache.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const [slug, version] = (await params).slug;
  const image = slug ? readProjectImage(slug) : null;

  if (!image || image.version !== version) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(image.file), {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
