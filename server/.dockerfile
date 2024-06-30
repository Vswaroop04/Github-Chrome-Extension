# Use the official Node.js image as the base image
FROM node:16

# Create and set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run dev

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
