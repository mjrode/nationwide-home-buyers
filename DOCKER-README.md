# Docker Deployment for Nationwide Home Buyers

This document outlines how to deploy the Nationwide Home Buyers application using Docker.

## Prerequisites

- Docker and Docker Compose installed
- Environment variables configured (see `.env.example`)

## Environment Variables

Create a `.env` file with the following variables:

```bash
# EmailJS Configuration (required for contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# Google Maps API Configuration (required for address autocomplete)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Local Development with Docker

```bash
# Build and run the container
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

## Production Deployment

### Using Docker Compose

1. Clone the repository
2. Create `.env` file with production values
3. Run: `docker-compose up -d`

### Using Pre-built Image

```bash
# Pull the latest image
docker pull mjrode/nationwide-home-buyers:latest

# Run the container
docker run -d \
  --name nationwide-home-buyers \
  -p 3000:3000 \
  -e NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id \
  -e NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id \
  -e NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key \
  -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key \
  mjrode/nationwide-home-buyers:latest
```

## CI/CD Pipeline

The application uses GitHub Actions for automated building and deployment:

- **Trigger**: Push to `main` branch
- **Build**: Multi-stage Docker build
- **Push**: To Docker Hub as `mjrode/nationwide-home-buyers`
- **Deploy**: Webhook trigger to restart container on server

## Production URLs

- **Main Site**: https://nationwide-home-buyers.mjrflix.com
- **Admin Panel**: https://nationwide-home-buyers.mjrflix.com/admin

## Traefik Configuration

For production deployment with Traefik reverse proxy, uncomment the labels in `docker-compose.yml`:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.nationwide-home-buyers-rtr.entrypoints=https"
  - "traefik.http.routers.nationwide-home-buyers-rtr.rule=Host(`nationwide-home-buyers.mjrflix.com`)"
  - "traefik.http.routers.nationwide-home-buyers-rtr.tls=true"
  - "traefik.http.routers.nationwide-home-buyers-rtr.service=nationwide-home-buyers-svc"
  - "traefik.http.services.nationwide-home-buyers-svc.loadbalancer.server.port=3000"
```

## Health Checks

The container includes health checks that verify the application is responding on port 3000.

## Troubleshooting

### Container won't start
- Check environment variables are set correctly
- Verify port 3000 is not in use
- Check Docker logs: `docker-compose logs`

### Build issues
- Ensure `package-lock.json` is present
- Clear Docker build cache: `docker system prune -a`
- Check Node.js version compatibility (requires Node 18+)
