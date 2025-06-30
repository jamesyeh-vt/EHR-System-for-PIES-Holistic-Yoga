# EHR-System-for-PIES-Holistic-Yoga — Back‑end Service

A Spring Boot (3.5.x) API that powers the **Pies Yoga** platform. It exposes REST endpoints for therapists, patients,
intake forms, SOAP/self‑assessment notes and JWT‑based authentication, all documented via OpenAPI/Swagger.

---

## 1  Tech Stack

- **Java 17** / Spring Boot 3.5
- Spring Data JPA + Hibernate 6
- MySQL 8 (official Docker image)
- Flyway (schema migrations)
- Spring Security 6 + JWT
- springdoc‑openapi‑starter 2.x (Swagger UI)
- Docker / Docker Compose
- Maven Wrapper (`./mvnw`)

---

## 2  Project Layout

```
pies-backend/
├── docker-compose.yml            # Prod‑grade compose (api + db)
├── src/main/java/com/pies
│   ├── auth                      # JWT, login, filters, controllers
│   ├── therapist                 # therapist domain + repository
│   ├── patient                   # patient domain
│   └── …                         # other bounded contexts
├── src/main/resources
│   ├── db/migration              # Flyway *.sql files (V1__init_tables.sql …)
│   ├── application.yml           # shared base config
│   ├── application-dev.yml       # dev profile (no JWT, Swagger on)
│   └── application-prod.yml      # prod profile (JWT on, Swagger off)
├── src/main/resources            # template for env vars
├── .env.example                  # template for env vars
├── .gitignore
└── README.md                     # ← this file
```

---

## 3  Configuration & Environments

| Variable                        | Dev Default                   | Prod Notes                         |
|---------------------------------|-------------------------------|------------------------------------|
| `SPRING_PROFILES_ACTIVE`        | `dev`                         | `prod` in Docker/cloud             |
| `MYSQL_DATABASE`                | `piesdb`                      | same (override if needed)          |
| `MYSQL_USER` / `MYSQL_PASSWORD` | `pies` / `piespwd`            | create matching MySQL user in prod |
| `JWT_SECRET`                    | **change‑me**                 | generate a long random string      |
| `SPRING_DATASOURCE_URL`         | `jdbc:mysql://db:3306/piesdb` | injected by Docker compose         |

> **Quick start**\
> `cp .env.example .env` and adjust secrets; profiles are auto‑selected at runtime.

---

## 4  Running Locally

1. **Start the database only**
   ```bash
   docker compose up -d db
   ```
2. **Run the API with Maven**
   ```bash
   ./mvnw spring-boot:run
   ```
3. **Open API docs**
    - Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
    - Raw JSON:   [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)
      *(Dev profile disables JWT filter so Swagger works without a token.)*

---

## 5 Docker Usage

The included `docker-compose.yml` spins up **api**+**db** in one shot:

```yaml
services:
  db:
    image: mysql:8.4
    env_file: .env
    volumes: [ db_data:/var/lib/mysql ]
    healthcheck:
      test: [ "CMD","mysqladmin","ping","-h","localhost" ]
      interval: 5s
      retries: 5

  api:
    build: .
    env_file: .env
    ports: [ "8080:8080" ]
    depends_on:
      db:
        condition: service_healthy

volumes:
  db_data:
```

```bash
docker compose up --build -d
```

> Swagger UI is **disabled** in `prod` for security.\
> Change profile with `SPRING_PROFILES_ACTIVE` if you need internal docs.

---

## 6  Database Migrations

- Every schema change → add a file to `src/main/resources/db/migration` (e.g. `V2__add_indexes.sql`).
- Flyway runs automatically on start‑up (dev & prod).

---

## 7  Security in Prod

- Stateless JWT Auth (`Authorization: Bearer <token>`)
- `/auth/**` is public; all other endpoints require authentication.
- Roles: `ADMIN`, `SENIOR`, etc. (see `SecurityConfig`).
- Remember to replace `JWT_SECRET` & create an admin user at first boot.

---

## 8  Git Workflow

```bash
# first‑time clone
git clone git@github.com:jamesyeh-vt/pies-backend.git
cd pies-backend
cp .env.example .env

# create a feature branch
git checkout -b feature/my-awesome-change
# …commit code…
git push -u origin feature/my-awesome-change

# open a PR on the private GitHub org
```

---

## 9  Makefile (optional helpers)

```make
dev-up:      ## start db + dev api
	docker compose up -d db
	./mvnw spring-boot:run

compose-up:  ## prod-like compose
	docker compose up --build -d

compose-down:
	docker compose down -v
```

──────────────────────────────────────────

