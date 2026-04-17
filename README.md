# BDS

## Docker plan

1. Build app with Next.js `standalone` output (already enabled in config).
2. Use a multi-stage Docker build to keep runtime image small and fast.
3. Run app with `docker compose` and environment-based configuration.

## Docker implementation

- Added [Dockerfile](Dockerfile) (multi-stage build for production)
- Added [.dockerignore](.dockerignore)
- Added [docker-compose.yml](docker-compose.yml)
- Added [.env.example](.env.example)

## Run with Docker

1. Copy env template:

	```bash
	cp .env.example .env
	```

2. Start production container:

	```bash
	docker compose --profile prod up --build -d
	```

3. Open app at `http://localhost:3000`

4. Stop container:

	```bash
	docker compose down
	```

## Run with Docker (development / hot reload)

Use the dev profile with bind mount and `next dev`:

```bash
docker compose --profile dev up -d
```

View logs:

```bash
docker compose logs -f web-dev
```

Stop:

```bash
docker compose down
```

## Notes

- The container runs the compiled Next.js server (`node server.js`) from standalone output.
- Update `.env` values for your real API/base URLs before deployment.
- If you change `NEXT_PUBLIC_*` values in production, rebuild image: `docker compose --profile prod up --build -d`.