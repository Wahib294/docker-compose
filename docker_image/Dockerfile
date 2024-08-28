# Stage 1: Build the frontend
FROM node:18

# Set working directory
WORKDIR /app

COPY frontend/ ./frontend/

RUN cd frontend && npm install && npm run build

COPY backend/ ./backend/

RUN cd backend && npm install

# Expose ports
EXPOSE 5000
EXPOSE 3000

# Start both the backend and the frontend
CMD ["sh", "-c", "node backend/src/index.js"]
