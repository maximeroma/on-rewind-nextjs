## Getting Started

First, add .env file to root folder:

```bash
NEXT_PUBLIC_ON_REWIND_URL=XXXX
NEXT_PUBLIC_ACCOUNT_ID=XXXX
```

Run application:

```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up web
```

Test application:

```bash
npm run e2e
```
