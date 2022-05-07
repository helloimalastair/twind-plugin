import { create } from "twind";
import type { TW } from "twind";
import { virtualSheet, getStyleTag } from "twind/sheets";
import type { PluginArgs } from "..";

const sheet = virtualSheet();

export const onRequest: PagesPluginFunction<
  unknown,
  any,
  Record<string, unknown>,
  PluginArgs
>[] = [
  async ({ next, pluginArgs = {} }) => {
    console.log("Hey");
    const response = await next();
    // if (response.headers.get("content-type") !== "text/html") return response;
    sheet.reset();
    const { tw } = create({
      ...pluginArgs,
      sheet,
      mode: "silent",
    });
    await new HTMLRewriter()
      .on("*", new StyleExtractor(tw))
      .transform(response.clone())
      .text();
    return new HTMLRewriter()
      .on("head", new StyleInjector(getStyleTag(sheet)))
      .transform(response);
  },
];

class StyleExtractor implements HTMLRewriterElementContentHandlers {
  tw: TW;
  constructor(tw: TW) {
    this.tw = tw;
  }
  element(e: Element) {
    const classes = Object.fromEntries(e.attributes).class;
    this.tw(classes);
  }
}

class StyleInjector implements HTMLRewriterElementContentHandlers {
  styleTag: string;
  constructor(styleTag: string) {
    this.styleTag = styleTag;
  }
  element(head: Element) {
    head.append(this.styleTag, { html: true });
  }
}
