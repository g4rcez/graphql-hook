import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import { fetchQL, interceptContext, RawHeaders } from "./fetch-ql";
import { jsonToGql } from "./json-to-gql";

export const playground = async (
  endpoint: string,
  port: number = 1337,
  headers: RawHeaders
) => {
  const json = await fetchQL(endpoint, headers);
  const schema = await jsonToGql(json);
  const gqlSchema = gql(schema);

  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: gqlSchema,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    }),
    debug: true,
    uploads: true,
    tracing: true,
    playground: true,
    introspection: true,
    cors: true,
    formatResponse: (res, query): any => {
      if (query.request.operationName === "IntrospectionQuery") {
        return res;
      }
      return {
        ...res,
        data: (query.context as any).json,
      };
    },
    context: ({ req }) => interceptContext({ req, endpoint, headers }),
  });
  server.listen({ port }).then(() => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};
