const http = require("http");

const testCases = [
  {
    name: "Marco D'Angelo",
    company: "Golden Spoon Restaurant",
    industry: "Restaurant",
  },
  {
    name: "Sarah Chen",
    company: "TechStart Solutions",
    industry: "Software",
  },
  {
    name: "John Smith",
    company: "BuildRight Construction",
    industry: "Construction",
  },
];

async function testAPI(testCase, index) {
  return new Promise((resolve) => {
    const data = JSON.stringify(testCase);

    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/api/generate",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        console.log(
          `\n===== TEST ${index + 1}: ${testCase.company} (${testCase.industry}) =====`,
        );
        console.log(`Status: ${res.statusCode}`);
        try {
          const json = JSON.parse(body);
          console.log("\nINSIGHT:");
          console.log(json.insight);
          console.log("\nPAIN POINTS:");
          console.log(json.painPoints);
          console.log("\nMESSAGE:");
          console.log(json.message);
          console.log("\nNEXT STEPS:");
          console.log(json.nextSteps);
        } catch (e) {
          console.log("Response:", body);
        }
        resolve();
      });
    });

    req.on("error", (e) => {
      console.error(`Error in test ${index + 1}:`, e.message);
      resolve();
    });

    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log("Starting API tests...\n");
  for (let i = 0; i < testCases.length; i++) {
    await new Promise((r) => setTimeout(r, 2000)); // 2sec delay between requests
    await testAPI(testCases[i], i);
  }
  console.log("\n✓ All tests complete");
  process.exit(0);
}

runTests();
