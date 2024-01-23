# Use an official Node.js runtime as the base image
FROM node:16
RUN node -v
# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the dependencies in the package.json
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Expose port 5000 for the app to be accessible
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]