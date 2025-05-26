import { LoggerSeverity, ModuleMode, PXEnforcer, PXRawConfig } from '@chen.zimmer.perimeterx/internal-human-security-netlify-enforcer';
import type { Context } from "@netlify/edge-functions";

export default async function handler(request: Request, context: Context) {
  const config: PXRawConfig = {
    px_app_id: Netlify.env.get("PX_APP_ID"),
    px_cookie_secret: Netlify.env.get("PX_COOKIE_SECRET"),
    px_auth_token: Netlify.env.get("PX_AUTH_TOKEN"),
    px_logger_severity: LoggerSeverity.DEBUG,
    px_module_mode: ModuleMode.ACTIVE_BLOCKING,
    px_login_credentials_extraction_enabled: true,
    px_login_credentials_extraction: [ {
      path: "/login",
      path_type: "exact",
      sent_through: "body",
      method: "POST",
      user_field: "username",
      pass_field: "password",
      protocol: "v1",
      login_successful_reporting_method: "header"
    }],
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