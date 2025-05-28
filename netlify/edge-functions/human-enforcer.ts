import { LoggerSeverity, ModuleMode, PXEnforcer, PXRawConfig } from 'internal-human-security-netlify-enforcer';
import type { Context } from "@netlify/edge-functions";

export default async function handler(request: Request, context: Context) {
  const config: PXRawConfig = {
    px_app_id: Netlify.env.get("PX_APP_ID"),
    px_cookie_secret: Netlify.env.get("PX_COOKIE_SECRET"),
    px_auth_token: Netlify.env.get("PX_AUTH_TOKEN"),
    px_logger_severity: LoggerSeverity.DEBUG,
    px_module_mode: ModuleMode.ACTIVE_BLOCKING,
    px_backend_url: "https://3f9e78eb52c3.ngrok.app",
    px_login_credentials_extraction: [ {
      path: "/login",
      path_type: "exact",
      sent_through: "body",
      method: "POST",
      user_field: "username",
      protocol: "v2",
      pass_field: "password",
      login_successful_reporting_method: "status",
      login_successful_statuses: [200]
    }, {
      path: "/login-header",
      path_type: "exact",
      sent_through: "header",
      method: "POST",
      user_field: "password",
      protocol: "v2",
      pass_field: "username",
      login_successful_reporting_method: "status",
      login_successful_statuses: [200]
      },
      {
        path: "/login-nested-object",
        path_type: "exact",
        sent_through: "body",
        method: "POST",
        user_field: "nested.password",
        protocol: "v2",
        pass_field: "nested.username",
        login_successful_reporting_method: "status",
        login_successful_statuses: [200]
      },
      {
        path: "/login-params",
        path_type: "exact",
        sent_through: "query-param",
        method: "PUT",
        user_field: "password",
        protocol: "v2",
        pass_field: "username",
        login_successful_reporting_method: "status",
        login_successful_statuses: [200]
      }
    ],
    px_automatic_additional_s2s_activity_enabled: true,
    px_send_raw_username_on_additional_s2s_activity: true,
    px_additional_s2s_activity_header_enabled: false,
    px_login_credentials_extraction_enabled: true,
    px_extract_user_ip: (request) => {
      return context.ip;
    },
  };

  const px = new PXEnforcer(config);
  const resp = await px.enforce(request);

  const originResponse = await context.next();

  await px.handleResponse(originResponse.clone(), resp);
  
  if (resp.pxResponse) {
    return new Response(resp.pxResponse.body, {
      headers: resp.pxResponse.headers as HeadersInit,
      status: resp.pxResponse.status,
    });
  }

  return originResponse;
} 