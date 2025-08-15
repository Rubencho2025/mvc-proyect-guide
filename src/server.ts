import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import { createRecordRoutes } from "./routes/recordRoutes"
import { ConsoleView } from "./views/ConsoleView"

/**
 * Main Server Application
 * Sets up Express server with MVC architecture
 */
class Server {
  private app: Application
  private port: number
  private consoleView: ConsoleView

  constructor(port = 3001) {
    this.app = express()
    this.port = port
    this.consoleView = new ConsoleView()
    this.setupMiddleware()
    this.setupRoutes()
  }

  /**
   * Configure middleware
   */
  private setupMiddleware(): void {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    // Request logging middleware
    this.app.use((req: Request, res: Response, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
      next()
    })
  }

  /**
   * Configure routes
   */
  private setupRoutes(): void {
    // API routes
    this.app.use("/api", createRecordRoutes())

    // Root endpoint
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "MVC TypeScript Backend API",
        version: "1.0.0",
        endpoints: {
          "GET /api/records": "Get all records",
          "GET /api/records/:id": "Get record by ID",
          "GET /api/records/search?q=term": "Search records",
          "POST /api/records": "Create new record",
          "PUT /api/records/:id": "Update record",
          "DELETE /api/records/:id": "Delete record",
        },
      })
    })

    // 404 handler
    this.app.use("*", (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: "Endpoint not found",
      })
    })
  }

  /**
   * Start the server
   */
  public start(): void {
    this.app.listen(this.port, () => {
      this.consoleView.displayServerStart(this.port)
    })
  }
}

// Start the server
const server = new Server(3001)
server.start()

export default Server
