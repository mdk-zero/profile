import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

// Created on the first request, not at import. In GitHub mode Keystatic throws when
// its env vars are missing, and the build imports this file, so a missing variable
// would fail the whole deploy instead of only the CMS.
let handler: ReturnType<typeof makeRouteHandler> | undefined;

function getHandler() {
  handler ??= makeRouteHandler({ config });
  return handler;
}

export async function GET(request: Request) {
  return getHandler().GET(request);
}

export async function POST(request: Request) {
  return getHandler().POST(request);
}
