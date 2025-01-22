import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
	client: "@hey-api/client-axios",
	input: "http://localhost:10001/openapi.json",
	output: "src/client",
});
