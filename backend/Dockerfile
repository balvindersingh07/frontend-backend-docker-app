# Use Python slim image for smaller footprint.
FROM python:3.11-slim

# Set working directory for backend app.
WORKDIR /app

# Copy dependency file first to use Docker layer cache.
COPY requirements.txt .

# Install Python dependencies without cache to reduce image size.
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code.
COPY . .

# Backend API listens on port 5000.
EXPOSE 5000

# Start Flask application.
CMD ["python", "app.py"]
