import { Netease } from "../request";
import { cutImg } from "@renderer/utils/netease";

export async function get() {
  const result = await Netease("/personalized/newsong");
  return result;
}
