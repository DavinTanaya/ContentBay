import { GraphQLClient } from "graphql-request";
import { API_URL } from "../lib/config";

export function createClient() {
  const token = localStorage.getItem("token");

  return new GraphQLClient(API_URL, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}
