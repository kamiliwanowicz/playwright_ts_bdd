import { test, expect } from "@playwright/test";
import { topTestData, count } from "../api-test-data/DatastreamsTestData";

for (const data of topTestData) {
  test(`Datastreams top value: ${data.num}`, async ({ request }) => {
    const url = `https://sensors.bgs.ac.uk/FROST-Server/v1.1/Datastreams?%24top=${data.num}&%24count=true`;
    const response = await request.get(url);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.value.length).toBe(data.num);
  });
}

for (const c of count) {
  test(`Datastreams count: ${c}`, async ({ request }) => {
    const url = `https://sensors.bgs.ac.uk/FROST-Server/v1.1/Datastreams?%24count=${c}`;
    const respose = await request.get(url);
    const responseBody = await respose.json();
    if (c === "true") {
      expect(responseBody["@iot.count"]).toBeGreaterThan(0);
    } else {
      expect(responseBody).not.toContain("iot.count");
    }
    console.log("ok");
  });
}
