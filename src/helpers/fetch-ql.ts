import type { Request } from "express";
import { getIntrospectionQuery } from "graphql";
import fetch from "node-fetch";

export type RawHeaders = { [key: string]: string };

export const fetchQL = async (
  endpoint: string,
  headers?: RawHeaders
): Promise<string> =>
  new Promise(async (res) => {
    const body = JSON.stringify({ query: getIntrospectionQuery() });
    const response = await fetch(endpoint, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        ...headers,
      },
      body,
      method: "POST",
    });
    return res(response.text());
  });

export const interceptContext = async ({
  req,
  endpoint,
  headers = {},
}: {
  req: Request;
  endpoint: string;
  headers: RawHeaders;
}) => {
  if (req.body.operationName !== "IntrospectionQuery") {
    const response = await fetch(endpoint, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        ...headers,
      },
      body: JSON.stringify(req.body),
      method: "POST",
    });
    const json = await response.json();
    return { json };
  }
};
