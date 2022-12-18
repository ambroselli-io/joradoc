import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import "./db/mongo.server";

import * as Sentry from "@sentry/remix";
import { SENTRY_XXX, ENVIRONMENT } from "app/config";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: SENTRY_XXX,
    environment: `api-${ENVIRONMENT}`,
  });
}

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  responseHeaders.set("Content-Type", "text/html");

  // if (responseStatusCode >= 400) {
  //   capture(remixContext.appState.error, {
  //     extra: {
  //       request,
  //       responseStatusCode,
  //       responseHeaders,
  //       remixContext,
  //     },
  //   });
  // }

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
