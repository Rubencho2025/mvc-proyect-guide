import type { Request, Response } from "express"
import type { RecordRepository } from "../models/RecordRepository"

/**
 * RecordController - Handles HTTP requests and responses
 * Implements the Controller layer of MVC architecture
 */
export default class RecordController {
  constructor(private readonly recordRepository: RecordRepository) {}

  /**
   * GET /api/records - Get all records
   */
  readonly getAllRecords = async (_req: Request, res: Response): Promise<void> => {
    const records = this.recordRepository.findAll()
    if (!records || records.length === 0) {
      res.status(204).json({ message: "Records not found" })
      return
    }
    res.status(200).json(records.map((record) => record.toJSON()))
  }

  /**
   * GET /api/records/:id - Get record by ID
   */
  readonly getRecordById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params["id"]
    if (!id) {
      res.status(400).json({ message: "Record ID is required" })
      return
    }

    const numericId = Number.parseInt(id)
    if (isNaN(numericId)) {
      res.status(400).json({ message: "Invalid ID format" })
      return
    }

    const record = this.recordRepository.findById(numericId)
    if (!record) {
      res.status(404).json({ message: "Record not found" })
      return
    }

    res.status(200).json(record.toJSON())
  }

  /**
   * GET /api/records/search?q=searchTerm - Search records
   */
  readonly searchRecords = async (req: Request, res: Response): Promise<void> => {
    const searchTerm = req.query.q as string
    if (!searchTerm) {
      res.status(400).json({ message: "Search term is required" })
      return
    }

    const records = this.recordRepository.findByName(searchTerm)
    if (records.length === 0) {
      res.status(404).json({ message: "No records found with that search term" })
      return
    }

    res.status(200).json(records.map((record) => record.toJSON()))
  }

  /**
   * POST /api/records - Create new record
   */
  readonly createRecord = async (req: Request, res: Response): Promise<void> => {
    const { name, lastName } = req.body

    if (!name || !lastName) {
      res.status(400).json({ message: "Name and lastName are required" })
      return
    }

    const record = this.recordRepository.create(name, lastName)
    res.status(201).json(record.toJSON())
  }

  /**
   * PUT /api/records/:id - Update record
   */
  readonly updateRecord = async (req: Request, res: Response): Promise<void> => {
    const id = req.params["id"]
    if (!id) {
      res.status(400).json({ message: "Record ID is required" })
      return
    }

    const numericId = Number.parseInt(id)
    if (isNaN(numericId)) {
      res.status(400).json({ message: "Invalid ID format" })
      return
    }

    const { name, lastName } = req.body
    const record = this.recordRepository.update(numericId, name, lastName)

    if (!record) {
      res.status(404).json({ message: "Record not found" })
      return
    }

    res.status(200).json(record.toJSON())
  }

  /**
   * DELETE /api/records/:id - Delete record
   */
  readonly deleteRecord = async (req: Request, res: Response): Promise<void> => {
    const id = req.params["id"]
    if (!id) {
      res.status(400).json({ message: "Record ID is required" })
      return
    }

    const numericId = Number.parseInt(id)
    if (isNaN(numericId)) {
      res.status(400).json({ message: "Invalid ID format" })
      return
    }

    const deleted = this.recordRepository.delete(numericId)
    if (!deleted) {
      res.status(404).json({ message: "Record not found" })
      return
    }

    res.status(200).json({ message: "Record deleted successfully" })
  }
}
