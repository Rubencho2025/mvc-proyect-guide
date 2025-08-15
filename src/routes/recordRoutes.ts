import { Router } from "express"
import RecordController from "../controllers/RecordController"
import { RecordRepository } from "../models/RecordRepository"

/**
 * Record Routes - Defines API endpoints
 */
export function createRecordRoutes(): Router {
  const router = Router()
  const recordRepository = new RecordRepository()
  const recordController = new RecordController(recordRepository)

  // Routes
  router.get("/records", recordController.getAllRecords)
  router.get("/records/search", recordController.searchRecords)
  router.get("/records/:id", recordController.getRecordById)
  router.post("/records", recordController.createRecord)
  router.put("/records/:id", recordController.updateRecord)
  router.delete("/records/:id", recordController.deleteRecord)

  return router
}
