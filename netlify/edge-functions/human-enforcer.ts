import { PXEnforcer, PXRawConfig } from "perimeterx-node-core-ts";
import type { Config, Context } from "@netlify/edge-functions";

export default async function handler(request: Request, context: Context) {
  const config: PXRawConfig = {
    px_app_id: Netlify.env.get("PX_APP_ID"),
    px_cookie_secret: Netlify.env.get("PX_COOKIE_SECRET"),
    px_auth_token: Netlify.env.get("PX_AUTH_TOKEN"),
    px_extract_user_ip: (request) => {
      return context.ip;
    },
  };

  const px = new PXEnforcer(config);
  const resp = await px.enforce(request);
  
  if (resp.pxResponse) {
    return new Response(resp.pxResponse.body, {
      headers: resp.pxResponse.headers as HeadersInit,
      status: resp.pxResponse.status,
    });
  }
  
  return await context.next();
} 