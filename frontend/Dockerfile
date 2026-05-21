# Use a lightweight Node.js image.
FROM node:18-alpine

# Set working directory inside the container.
WORKDIR /app

# Copy package files first for better layer caching.
COPY package*.json ./

# Install only production dependencies for lean image size.
RUN npm install --omit=dev

# Copy the rest of the application files.
COPY . .

# Application listens on port 3000.
EXPOSE 3000

# Start Express server.
CMD ["node", "server.js"]
