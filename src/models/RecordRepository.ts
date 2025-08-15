import { Record } from "./Record"

/**
 * RecordRepository - Data Access Layer
 * Handles CRUD operations for Record entities
 * In a real application, this would connect to a database
 */
export class RecordRepository {
  private records: Map<number, Record> = new Map()
  private nextId = 1

  /**
   * Add a new record
   */
  create(name: string, lastName: string): Record {
    const record = new Record(this.nextId++, name, lastName)
    this.records.set(record.id, record)
    return record
  }

  /**
   * Find a record by ID
   */
  findById(id: number): Record | null {
    return this.records.get(id) || null
  }

  /**
   * Find records by name (partial match, case-insensitive)
   */
  findByName(searchName: string): Record[] {
    const results: Record[] = []
    const searchLower = searchName.toLowerCase()

    for (const record of this.records.values()) {
      if (record.name.toLowerCase().includes(searchLower) || record.lastName.toLowerCase().includes(searchLower)) {
        results.push(record)
      }
    }

    return results
  }

  /**
   * Get all records
   */
  findAll(): Record[] {
    return Array.from(this.records.values())
  }

  /**
   * Update an existing record
   */
  update(id: number, name?: string, lastName?: string): Record | null {
    const record = this.records.get(id)
    if (!record) {
      return null
    }

    if (name !== undefined) {
      record.name = name
    }
    if (lastName !== undefined) {
      record.lastName = lastName
    }

    return record
  }

  /**
   * Delete a record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id)
  }

  /**
   * Get total count of records
   */
  count(): number {
    return this.records.size
  }

  /**
   * Clear all records (for testing)
   */
  clear(): void {
    this.records.clear()
    this.nextId = 1
  }
}
