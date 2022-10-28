import { GraphQLDateTime } from "graphql-scalars";
import { asNexusMethod } from "nexus";
export * from "./User";
export const GQLDate = asNexusMethod(GraphQLDateTime, "datetime");
