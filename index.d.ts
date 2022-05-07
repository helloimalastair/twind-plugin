import type { create } from "twind";

export type PluginArgs = Omit<Parameters<typeof create>[0], "mode" | "sheet">;

export default function (args?: PluginArgs): PagesFunction;