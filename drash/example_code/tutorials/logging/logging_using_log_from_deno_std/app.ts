import { Drash } from "https://deno.land/x/drash/mod.ts";

import HomeResource from "./home_resource.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [HomeResource]
});

server.run({
  hostname: "localhost",
  port: 1447
});
