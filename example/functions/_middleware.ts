import twindPlugin from "@cfpreview/pages-plugin-twind";

const hello = async ({ next }) => {
  const response = await next();
  response.headers.set("X-Hello", "Hello from functions Middleware!");
  return response;
};


export const onRequest: PagesFunction[] = [
  twindPlugin({
    darkMode: "class"
  }),
  hello
];
