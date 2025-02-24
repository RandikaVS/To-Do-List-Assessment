# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Production Stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node:20-alpine

# WORKDIR /app

# # Update npm to latest
# RUN npm install -g npm@11.0.0

# # Copy dependency files
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install --only=production

# # Install serve
# RUN npm i -g serve

# # Copy app files
# COPY . .

# # Build app
# RUN npm run build

# # Expose the port and start the app
# EXPOSE 3000
# CMD ["serve", "-s", "dist"]