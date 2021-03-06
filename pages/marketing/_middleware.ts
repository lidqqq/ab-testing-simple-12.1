import { NextRequest, NextResponse } from "next/server";
import { getBucket } from "@lib/ab-testing";
import { MARKETING_BUCKETS } from "@lib/buckets";

const COOKIE_NAME = "bucket-marketing";

export function middleware(req: NextRequest) {
  // Get the bucket cookie
  const bucket = req.cookies[COOKIE_NAME] || getBucket(MARKETING_BUCKETS);
  const destination = req.nextUrl.clone();
  destination.pathname = `/marketing/${bucket}`; // or /marketing
  const res = NextResponse.rewrite(destination);

  // Add the bucket to cookies if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, bucket);
  }

  return res;
}
