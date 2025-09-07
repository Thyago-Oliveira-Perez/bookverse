# 📚 Library App

Modern web application built with Hexagonal Architecture in .NET 8, Next.js frontend, PostgreSQL as the database, and RabbitMQ for messaging. Includes full local infrastructure using Docker, version management with **mise**, and CI with GitHub Actions.

## 🚀 Technologies Used

### 🔧 Backend (.NET 8)

* **ASP.NET Core 8 (WebAPI)**
* **Entity Framework Core (PostgreSQL)**
* **MediatR** – CQRS and handlers
* **OpenTelemetry** – observability
* **RabbitMQ.Client** – messaging

### 💻 Frontend

* **Next.js** – React-based framework for SSR and SSG
* **pnpm** – fast package manager for Node.js
* **Axios** – HTTP client

### 🧪 Testing

* **xUnit**
* **FluentAssertions**
* **Moq**

### 🐘 Database

* **PostgreSQL**

### 📦 Infrastructure

* **Docker Compose** – consistent local development
* **RabbitMQ** – message queue
* **GitHub Actions** – CI pipeline for build and tests
* **mise** – version management for Node.js and .NET

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
├── WebApp/   # Next.js frontend
│
├── .github/
│   └── workflows/ci.yml
│
└── README.md
```

---

## ▶️ Running Locally

### Prerequisites

* [mise](https://mise.jdx.dev/) – used to manage Node.js and .NET versions
* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (handled by mise)
* [Node.js LTS](https://nodejs.org/) (handled by mise)
* [pnpm](https://pnpm.io/installation) – install globally:

  ```bash
  npm install -g pnpm
  ```
* [Docker](https://www.docker.com/)

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

### 🛠️ 3. Configure EF Core CLI on Linux

When working on Linux, configure `dotnet-ef` as a local tool:

```bash
cd BookVerse
dotnet new tool-manifest # only once per repo
dotnet tool install dotnet-ef
dotnet tool restore
```

Run migrations with:

```bash
dotnet ef migrations add [MIGRATION_NAME] --project Infrastructure --startup-project Api
dotnet ef database update --project Infrastructure --startup-project Api
```

---

### ▶️ 4. Run the backend (.NET)

```bash
cd BookVerse
dotnet run --project Api
```

---

### 🌐 5. Run the frontend (Next.js with pnpm)

```bash
cd WebApp
pnpm install
pnpm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

## 🔧 Version Management with mise

This project uses **[mise](https://mise.jdx.dev/)** to ensure consistent runtime versions across environments.

* Versions for **.NET** and **Node.js** are declared in the `mise.toml` file at the root of the repository.

* When you enter the project directory, mise automatically switches to the correct versions (if installed).

* To install missing versions defined in `mise.toml`:

  ```bash
  mise install
  ```

* To check which versions are currently active:

  ```bash
  mise list
  ```

This guarantees all developers and CI pipelines run on the exact same versions.

---

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

| Command                           | Description                        |
| --------------------------------- | ---------------------------------- |
| `dotnet ef migrations add [NAME]` | Create a new EF Core migration     |
| `dotnet ef database update`       | Apply migrations to the database   |
| `docker compose down`             | Stop all containers                |
| `docker compose logs -f`          | View logs in real time             |
| `dotnet run --project ...`        | Run a specific .NET project        |
| `pnpm install`                    | Install frontend dependencies      |
| `pnpm run dev`                    | Run Next.js development server     |
| `mise install`                    | Install runtimes defined in config |
| `mise list`                       | Show active versions               |

---

## 🧱 Future Improvements

* Authentication and authorization using **Keycloak**
* Book purchasing functionality integrated with a fake payment provider already started in `Payment/FakePayment`
* Production-grade deployment (Azure, AWS, etc.)
* Caching with Redis
* Integration and load testing

---

## 🔑 Keycloak Integration

In future iterations, the application will use **[Keycloak](https://www.keycloak.org/)** as the identity and access management solution.

Keycloak will provide:

* **User authentication** (login, logout, registration)
* **Authorization** through roles and groups
* **Token management** (JWT/OAuth2)
* **SSO (Single Sign-On)** capabilities

Planned integration flow:

1. The **backend (.NET 8 API)** will validate access tokens issued by Keycloak.
2. The **Next.js frontend** will integrate with Keycloak for user login and token refresh.
3. Future modules like **book purchasing** will leverage Keycloak roles (e.g., `user`, `admin`) to control access.

---

## 💳 Fake Payment Module

To support the upcoming **book purchasing feature**, a **fake payment provider** has been added to the project under:

```
Payment/FakePayment/
├── Controllers
├── Models
└── Services
```

This module simulates a payment gateway and can be used during development and testing without relying on an external provider.

Planned usage:

* Allow testing of purchase flows end-to-end.
* Provide mock responses (success, failure, pending).
* Be easily replaceable with a real payment gateway in the future.

---

## 📄 License

Distributed under the MIT license. See `LICENSE` for details.

---