
# Use official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore


# Copy the remaining files and build the project
COPY . ./
RUN dotnet publish -c Release -o out

# Use a lightweight runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Set environment variables for PostgreSQL
ENV ConnectionStrings__DefaultConnection="Host=db;Port=5432;Database=todo_db;Username=sahan;Password=sahan"

# Expose the port and run the API
EXPOSE 8080
ENTRYPOINT ["dotnet", "MyBackend.dll"]
# CMD ["dotnet", "MyBackend.dll"]




# # Use official .NET SDK image for building
# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# WORKDIR /app

# # Copy project files and restore dependencies
# COPY . ./

# RUN dotnet restore MyBackend.csproj

# # Copy the remaining files and build the project
# COPY . ./
# RUN dotnet publish -c Release -o out

# # Runtime Stage

# # Use a lightweight runtime image
# FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

# WORKDIR /app
# COPY --from=build /app/out .

# # Set environment variables for PostgreSQL
# ENV ConnectionStrings__DefaultConnection="Host=db;Port=5432;Database=todo_db;Username=sahan;Password=sahan"

# # Expose the port and run the API
# EXPOSE 8080
# CMD ["dotnet", "MyBackend.dll"]

