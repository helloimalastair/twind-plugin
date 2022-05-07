import { nanoid } from "nanoid";
const headers = { "Access-Control-Allow-Origin": "*" };
export const onRequestOptions: PagesFunction = () =>
  new Response(null, { status: 204, headers });
export const onRequestPost: PagesFunction<Environment> = async ({
  request,
  env,
}) => {
  if (request.headers.get("content-type") !== "text/html")
    return new Response("Invalid Input", { status: 400, headers });
  const id = nanoid();
  await env.KV.put(id, request.body);
  return new Response(id, { headers });
};
