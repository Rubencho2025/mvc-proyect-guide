# MVC TypeScript Backend

A complete backend-only Node.js project implementing the Model-View-Controller (MVC) architecture using TypeScript and Object-Oriented Programming principles.

## Features

- ✅ Full MVC Architecture
- ✅ TypeScript with strict typing
- ✅ Object-Oriented Programming (OOP)
- ✅ RESTful API endpoints
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Data validation and error handling
- ✅ In-memory data storage
- ✅ Console-based view layer
- ✅ Comprehensive API testing

## Project Structure

\`\`\`
src/
├── models/
│   ├── Record.ts           # Record entity with validation
│   └── RecordRepository.ts # Data access layer
├── views/
│   └── ConsoleView.ts      # Console output formatting
├── controllers/
│   └── RecordController.ts # HTTP request handlers
├── routes/
│   └── recordRoutes.ts     # API route definitions
├── utils/
│   └── ApiTester.ts        # API testing utilities
└── server.ts               # Main server application

scripts/
└── test-api.ts             # Test script for API endpoints
\`\`\`

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Build the Project
\`\`\`bash
npm run build
\`\`\`

### 3. Start the Server
\`\`\`bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
\`\`\`

### 4. Test the API
\`\`\`bash
# Run the test script
npm run test-api
\`\`\`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/records` | Get all records |
| GET | `/api/records/:id` | Get record by ID |
| GET | `/api/records/search?q=term` | Search records by name |
| POST | `/api/records` | Create new record |
| PUT | `/api/records/:id` | Update existing record |
| DELETE | `/api/records/:id` | Delete record |

## Usage Examples

### Create a Record
\`\`\`bash
curl -X POST http://localhost:3001/api/records \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "lastName": "Doe"}'
\`\`\`

### Get All Records
\`\`\`bash
curl http://localhost:3001/api/records
\`\`\`

### Search Records
\`\`\`bash
curl "http://localhost:3001/api/records/search?q=John"
\`\`\`

### Update a Record
\`\`\`bash
curl -X PUT http://localhost:3001/api/records/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Johnny", "lastName": "Doe"}'
\`\`\`

### Delete a Record
\`\`\`bash
curl -X DELETE http://localhost:3001/api/records/1
\`\`\`

## MVC Architecture Explanation

### Model Layer (`src/models/`)
- **Record.ts**: Entity class with data validation and business logic
- **RecordRepository.ts**: Data access layer handling CRUD operations

### View Layer (`src/views/`)
- **ConsoleView.ts**: Handles console output formatting and display

### Controller Layer (`src/controllers/`)
- **RecordController.ts**: Handles HTTP requests, validates input, and coordinates between models and views

## OOP Principles Implemented

1. **Encapsulation**: Private properties with getter/setter methods
2. **Abstraction**: Clear interfaces between layers
3. **Inheritance**: Extensible class structure
4. **Polymorphism**: Method overriding and interface implementation

## Development Commands

\`\`\`bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start development server
npm run dev

# Start production server
npm start

# Watch for changes
npm run watch
\`\`\`

## Testing

The project includes a comprehensive API tester that validates all endpoints:

\`\`\`bash
# Run API tests
node dist/scripts/test-api.js
\`\`\`

## Next Steps

To extend this project, you could:

1. Add database integration (PostgreSQL, MongoDB, etc.)
2. Implement authentication and authorization
3. Add input validation middleware
4. Create a web-based frontend
5. Add unit and integration tests
6. Implement logging and monitoring
7. Add API documentation with Swagger
