# 📚 Library App

Modern web application built with Hexagonal Architecture in .NET 8, Vue.js frontend, PostgreSQL as the database, and RabbitMQ for messaging. Includes full local infrastructure using Docker and CI with GitHub Actions.

## 🚀 Technologies Used

### 🔧 Backend (.NET 8)
- **ASP.NET Core 8 (WebAPI)**
- **Entity Framework Core (PostgreSQL)**
- **MediatR** – CQRS and handlers
- **OpenTelemetry** – observability
- **RabbitMQ.Client** – messaging

### 💻 Frontend
- **Vue.js** – Single Page Application
- **pnpm** – fast package manager for Node.js
- **Axios** – HTTP client

### 🧪 Testing
- **xUnit**
- **FluentAssertions**
- **Moq**

### 🐘 Database
- **PostgreSQL**

### 📦 Infrastructure
- **Docker Compose** – consistent local development
- **RabbitMQ** – message queue
- **GitHub Actions** – CI pipeline for build and tests

---

## 🗂️ Project Structure

```

BookVerse/
├──📦 BookVerse
│  ├── 📦 Core
│  │   ├── 📂 Domain
│  │   ├── 📂 Ports
│  │   │   ├── 📂 In
│  │   │   └── 📂 Out
│  │   └── 📂 Application
│  ├── 📦 Infrastructure
│  │   ├── 📂 Persistence
│  │   ├── 📂 Messaging
│  │   └── 📂 Observability
│  └── 📦 Api
│  │   ├── Controllers
│  │   └── Program.cs
│  └── 📦 Tests/
│
├── 📂 docker/
│   ├── .dockerignore
│   ├── docker-compose.override.yml
│   └── docker-compose.yml
│
├── 📦 Payment/
│   └── 📦 FakePayment/
│       ├── 📂 Controllers
│       ├── 📂 Models
│       └── 📂 Services
│
├── WebApp/
│
├── .github/
│   └── workflows/ci.yml
│
└── README.md
````

---

## ▶️ Running Locally

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js LTS](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) – install globally:
  ```bash
  npm install -g pnpm
  ````

* [Docker](https://www.docker.com/)
* EF Core CLI:

  ```bash
  dotnet tool install --global dotnet-ef
  ```

---

### 🔧 1. Clone the repository

```bash
git clone https://github.com/Thyago-Oliveira-Perez/Library.git
cd BookVerse
```

---

### 🐳 2. Start local infrastructure

```bash
docker compose -f docker/docker-compose.yml -f docker/docker-compose.override.yml up -d
```

This will start:

* PostgreSQL on port `5432`
* RabbitMQ UI: [http://localhost:15672](http://localhost:15672) (user: `guest`, password: `guest`)

---

### 🛠️ 3. Run the backend (.NET)

```bash
cd BookVerse
dotnet ef database update --project Infrastructure --startup-project Api
dotnet run --project Api
```

---

### 🌐 4. Run the frontend (Vue.js with pnpm)

```bash
cd webapp
pnpm install
pnpm run dev
```

Access the app at [http://localhost:5173](http://localhost:5173)

---

## 📄 Generating migrations

```bash
dotnet ef migrations add [MIGRATION_NAME] --project Infrastructure --startup-project Api
dotnet ef database update --project Infrastructure --startup-project Api
```

## ✅ Running Tests

```bash
dotnet test BookVerse/Tests
```

---

## 📦 CI/CD with GitHub Actions

The project includes a basic workflow at `.github/workflows/ci.yml` with the following steps:

* Restore dependencies
* Build
* Run unit tests

---

## 📚 Useful Commands

| Command                         | Description                      |
| ------------------------------- | -------------------------------- |
| `dotnet ef migrations add [NAME]` | Create a new EF Core migration   |
| `dotnet ef database update`     | Apply migrations to the database |
| `docker compose down`           | Stop all containers              |
| `docker compose logs -f`        | View logs in real time           |
| `dotnet run --project ...`      | Run a specific .NET project      |
| `pnpm install`                  | Install frontend dependencies    |
| `pnpm run dev`                  | Run Vue.js development server    |

---

## 🧱 Future Improvements

* JWT authentication
* Production-grade deployment (Azure, AWS, etc.)
* Caching with Redis
* Integration and load testing

---

## 📄 License

Distributed under the MIT license. See `LICENSE` for details.

---