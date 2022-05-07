export const onRequest: PagesFunction<Environment> = async ({
  request,
  env,
}) => {
  const path = new URL(request.url).pathname;
  const id = path.split("/")[2];
  const value = await env.KV.get(id);
  console.log(value);
  return new Response(value, { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "text/html" } });
};
