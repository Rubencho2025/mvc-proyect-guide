/**
 * Record Model - Represents a person record with number, name, and last name
 * Follows OOP principles with encapsulation and data validation
 */
export class Record {
  private _id: number
  private _name: string
  private _lastName: string

  constructor(id: number, name: string, lastName: string) {
    this.validateId(id)
    this.validateName(name)
    this.validateLastName(lastName)

    this._id = id
    this._name = name
    this._lastName = lastName
  }

  // Getters
  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get lastName(): string {
    return this._lastName
  }

  // Setters with validation
  set name(value: string) {
    this.validateName(value)
    this._name = value
  }

  set lastName(value: string) {
    this.validateLastName(value)
    this._lastName = value
  }

  // Validation methods
  private validateId(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("ID must be a positive integer")
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty")
    }
    if (name.length > 50) {
      throw new Error("Name cannot exceed 50 characters")
    }
  }

  private validateLastName(lastName: string): void {
    if (!lastName || lastName.trim().length === 0) {
      throw new Error("Last name cannot be empty")
    }
    if (lastName.length > 50) {
      throw new Error("Last name cannot exceed 50 characters")
    }
  }

  // Convert to JSON for API responses
  toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      lastName: this._lastName,
    }
  }

  // Create from plain object
  static fromObject(obj: any): Record {
    return new Record(obj.id, obj.name, obj.lastName)
  }

  // String representation
  toString(): string {
    return `Record(${this._id}): ${this._name} ${this._lastName}`
  }
}
