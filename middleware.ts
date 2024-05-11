import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// createMiddlewareClient
// NextResponse
export default async function name(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({
        req,res
    }, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    });
await supabase.auth.getSession();
return res;
}