import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { hydrate } from "react-dom";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: window.ENV.SENTRY_XXX,
    tracesSampleRate: 1,
    environment: "app",
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.remixRouterInstrumentation(
          useEffect,
          useLocation,
          useMatches
        ),
      }),
    ],
  });
}

hydrate(<RemixBrowser />, document);
