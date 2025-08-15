import type { Record } from "../models/Record"

/**
 * ConsoleView - Handles console output formatting
 * Implements the View layer of MVC architecture
 */
export class ConsoleView {
  /**
   * Display a single record
   */
  displayRecord(record: Record): void {
    console.log("┌─────────────────────────────────────┐")
    console.log("│              RECORD                 │")
    console.log("├─────────────────────────────────────┤")
    console.log(`│ ID: ${record.id.toString().padEnd(31)} │`)
    console.log(`│ Name: ${record.name.padEnd(29)} │`)
    console.log(`│ Last Name: ${record.lastName.padEnd(24)} │`)
    console.log("└─────────────────────────────────────┘")
  }

  /**
   * Display multiple records in a table format
   */
  displayRecords(records: Record[]): void {
    if (records.length === 0) {
      console.log("No records found.")
      return
    }

    console.log("\n┌──────┬──────────────────┬──────────────────┐")
    console.log("│  ID  │       NAME       │    LAST NAME     │")
    console.log("├──────┼──────────────────┼──────────────────┤")

    records.forEach((record) => {
      const id = record.id.toString().padEnd(4)
      const name = record.name.padEnd(16)
      const lastName = record.lastName.padEnd(16)
      console.log(`│ ${id} │ ${name} │ ${lastName} │`)
    })

    console.log("└──────┴──────────────────┴──────────────────┘")
    console.log(`Total records: ${records.length}\n`)
  }

  /**
   * Display success message
   */
  displaySuccess(message: string): void {
    console.log(`✅ ${message}`)
  }

  /**
   * Display error message
   */
  displayError(message: string): void {
    console.log(`❌ Error: ${message}`)
  }

  /**
   * Display info message
   */
  displayInfo(message: string): void {
    console.log(`ℹ️  ${message}`)
  }

  /**
   * Display server startup message
   */
  displayServerStart(port: number): void {
    console.log("╔══════════════════════════════════════╗")
    console.log("║        MVC TypeScript Server        ║")
    console.log("╠══════════════════════════════════════╣")
    console.log(`║ Server running on port ${port.toString().padEnd(13)} ║`)
    console.log(`║ API Base URL: http://localhost:${port.toString().padEnd(4)} ║`)
    console.log("║                                      ║")
    console.log("║ Available endpoints:                 ║")
    console.log("║ GET    /api/records                  ║")
    console.log("║ GET    /api/records/:id              ║")
    console.log("║ GET    /api/records/search?q=term    ║")
    console.log("║ POST   /api/records                  ║")
    console.log("║ PUT    /api/records/:id              ║")
    console.log("║ DELETE /api/records/:id              ║")
    console.log("╚══════════════════════════════════════╝")
  }
}
