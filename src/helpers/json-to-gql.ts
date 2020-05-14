import { printSchema, buildClientSchema } from "graphql";

export const jsonToGql = (data: string) => {
  const json = JSON.parse(data);
  let str = "";
  if (typeof json === "object") {
    if (typeof json["__schema"] === "object") {
      const data = json;
      const schema = buildClientSchema(data);
      str += printSchema(schema);
    } else if (
      typeof json["data"] === "object" &&
      typeof json["errors"] === "undefined"
    ) {
      const data = json["data"];
      const schema = buildClientSchema(data);
      str += printSchema(schema);
    } else if (typeof json["errors"] === "object") {
      throw new Error(JSON.stringify(json["errors"], null, 2));
    } else {
      throw new Error('No "data" key found in JSON object');
    }
  } else {
    throw new Error("Invalid JSON object");
  }
  return str
    .replace(/""""""/gi, "")
    .replace(/^\s*\n/gm, "")
    .replace(/}/g, "}\n");
};
