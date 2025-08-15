/**
 * API Tester - Helper class for testing the API endpoints
 * Run this to test all CRUD operations
 */
export class ApiTester {
  private baseUrl: string

  constructor(baseUrl = "http://localhost:3001/api") {
    this.baseUrl = baseUrl
  }

  /**
   * Test all API endpoints
   */
  async runTests(): Promise<void> {
    console.log("🧪 Starting API Tests...\n")

    try {
      // Test 1: Create records
      console.log("1. Creating records...")
      const record1 = await this.createRecord("John", "Doe")
      const record2 = await this.createRecord("Jane", "Smith")
      const record3 = await this.createRecord("Bob", "Johnson")
      console.log("✅ Records created successfully\n")

      // Test 2: Get all records
      console.log("2. Getting all records...")
      await this.getAllRecords()
      console.log("✅ Retrieved all records\n")

      // Test 3: Get record by ID
      console.log("3. Getting record by ID...")
      await this.getRecordById(1)
      console.log("✅ Retrieved record by ID\n")

      // Test 4: Search records
      console.log("4. Searching records...")
      await this.searchRecords("John")
      console.log("✅ Search completed\n")

      // Test 5: Update record
      console.log("5. Updating record...")
      await this.updateRecord(1, "Johnny", "Doe")
      console.log("✅ Record updated\n")

      // Test 6: Delete record
      console.log("6. Deleting record...")
      await this.deleteRecord(3)
      console.log("✅ Record deleted\n")

      // Test 7: Final state
      console.log("7. Final state of records...")
      await this.getAllRecords()

      console.log("🎉 All tests completed successfully!")
    } catch (error) {
      console.error("❌ Test failed:", error)
    }
  }

  private async createRecord(name: string, lastName: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastName }),
    })
    const data = await response.json()
    console.log(`   Created: ${data.data.name} ${data.data.lastName} (ID: ${data.data.id})`)
    return data
  }

  private async getAllRecords(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/records`)
    const data = await response.json()
    console.log(`   Found ${data.count} records:`)
    data.data.forEach((record: any) => {
      console.log(`   - ID: ${record.id}, Name: ${record.name} ${record.lastName}`)
    })
    return data
  }

  private async getRecordById(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/records/${id}`)
    const data = await response.json()
    if (data.success) {
      console.log(`   Found: ${data.data.name} ${data.data.lastName} (ID: ${data.data.id})`)
    }
    return data
  }

  private async searchRecords(searchTerm: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/records/search?q=${searchTerm}`)
    const data = await response.json()
    console.log(`   Search for "${searchTerm}" found ${data.count} results:`)
    data.data.forEach((record: any) => {
      console.log(`   - ID: ${record.id}, Name: ${record.name} ${record.lastName}`)
    })
    return data
  }

  private async updateRecord(id: number, name: string, lastName: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/records/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastName }),
    })
    const data = await response.json()
    if (data.success) {
      console.log(`   Updated: ${data.data.name} ${data.data.lastName} (ID: ${data.data.id})`)
    }
    return data
  }

  private async deleteRecord(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/records/${id}`, {
      method: "DELETE",
    })
    const data = await response.json()
    if (data.success) {
      console.log(`   Deleted record with ID: ${id}`)
    }
    return data
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new ApiTester()
  tester.runTests()
}
