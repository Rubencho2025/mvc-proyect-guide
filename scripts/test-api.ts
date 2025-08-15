import { ApiTester } from "../src/utils/ApiTester"

/**
 * Test script to verify all API endpoints
 * Run this after starting the server to test functionality
 */
async function main() {
  console.log("Starting API tests...\n")

  // Wait a moment for server to be ready
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const tester = new ApiTester("http://localhost:3001/api")
  await tester.runTests()
}

main().catch(console.error)
