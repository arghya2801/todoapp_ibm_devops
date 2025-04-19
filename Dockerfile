# Use a Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Clean install dependencies
# RUN npm cache clean --force

# Install dependencies, including dev dependencies, in one step
# RUN npm install --include=dev
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Add Vite to the PATH explicitly
# ENV PATH="/app/node_modules/.bin:${PATH}"

# Build the application for production
# RUN npm run build

# Install 'serve' globally to serve the static assets
# RUN npm install -g serve

# Expose port 3000, which is the default port for 'serve'
EXPOSE 5173

# Set environment variables to help with network issues (optional, but recommended)
# ENV NPM_CONFIG_CACHE_MAX=0
# ENV NPM_REGISTRY_TIMEOUT=60000

# Command to start the server
# CMD ["serve", "-s", "dist", "-l", "3000"]
CMD ["npm", "run", "dev"]
