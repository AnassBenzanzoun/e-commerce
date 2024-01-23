# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the dependencies in the package.json
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Build the React application
RUN npm run build

# Use an official lightweight Node.js runtime as the base image for the runtime stage
FROM node:16-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Install serve to serve the React application
RUN npm install -g serve

# Copy the build directory from the build stage into the working directory
COPY --from=0 /app/build .

# Expose port 5000 for the app to be accessible
EXPOSE 3000

# Define the command to run the application
CMD [ "serve", "-s", ".", "-l", "3000" ]