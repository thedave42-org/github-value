GitHub Value is a free and open-source application designed to help measure the adoption, value, and impact of GitHub features.

[![Style](https://github.com/user-attachments/assets/09c494cd-fbdb-4b8e-9cb3-696371e9487a)](https://github.com/settings/appearance#gh-dark-mode-only)
[![Style](https://github.com/user-attachments/assets/aca22119-b996-4bd4-b215-63874cce91c1)](https://github.com/settings/appearance#gh-light-mode-only)

### Core Features

- GitHub Copilot usage analytics and metrics
- Developer engagement tracking
- Light/Dark theme support
- Responsive Material Design UI

### Deployment

Here are the few ways you can deploy the application...

#### Docker Compose (Quick Start)

If you're running the application on your own machine, you can simply use [docker compose](https://docs.docker.com/compose/install/).

```
docker-compose up
```

This will start the server along with the MySQL database.

#### Heroku

You can deploy the application to Heroku using the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#install-with-an-installer).

> [!CAUTION]
> This will cost you about $17/month.

You will need to manually add the [config vars](https://devcenter.heroku.com/articles/config-vars) to the Heroku app. You can also edit config vars from your app’s `Settings` tab in the [Heroku Dashboard](https://dashboard.heroku.com/).

```bash
# Set all config vars
heroku config:set BASE_URL="https://octodemo-9e26d32b64b8.herokuapp.com"
heroku config:set GITHUB_APP_ID="1234567"
heroku config:set GITHUB_APP_INSTALLATION_ID="12345678"
heroku config:set GITHUB_APP_PRIVATE_KEY="$(cat path/to/secret.key)"
heroku config:set GITHUB_WEBHOOK_SECRET="secret"
heroku config:set WEBHOOK_PROXY_URL="https://smee.io/123"

# Verify that the config vars are set correctly
heroku config
```

```bash
heroku login

# Set stack to container
heroku stack:set container -a your-app-name

# If new app
heroku create your-app-name

# Push and deploy
git push heroku main

# Check the logs
heroku logs --tail

# Check the status of the app
heroku ps
```

#### Custom Deployment

You can of course deploy this application however you'd like. All that's needed besides the Dockerfile is a MySQL database.

### Development Setup

First ensure

- Docker and Docker Compose
- MySQL (if not using Docker)
- [Node.js 23+](https://nodejs.org/en) (for local development)
- Angular CLI 18+ (`npm install -g @angular/cli`)

Spin up a database. It's defined in the `docker-compose.yml` file.

```bash
docker-compose up -d client
```

Create and modify the [./backend/.env](./backend/.env.example) file to point to your local MySQL database.

Then, you can run the server and the client separately.

```bash
cd backend
cp .env.example .env  # Configure your env variables
npm install
npm run dev
```

```bash
cd frontend
npm install
ng serve --open
```

Congratulations! You now have a fully functioning development environment! 🧑‍💻

### Contributing

Feel free to submit issues or pull requests! Contributions are welcome! 🤗

### License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
