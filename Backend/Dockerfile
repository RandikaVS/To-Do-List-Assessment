
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore


COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

ENV ConnectionStrings__DefaultConnection="Host=db;Port=5432;Database=todo_db;Username=sahan;Password=sahan"

EXPOSE 5005
ENTRYPOINT ["dotnet", "MyBackend.dll"]