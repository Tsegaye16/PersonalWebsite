ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /usr/src/app-new

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .



# Expose the application port
EXPOSE 5000

# Set the environment variable
ENV NODE_ENV development

# Run the application
CMD ["npm", "start"]
