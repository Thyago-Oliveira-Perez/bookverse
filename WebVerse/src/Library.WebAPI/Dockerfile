FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["webservice/src/Library.WebAPI/Library.WebAPI.csproj", "src/Library.WebAPI/"]
COPY ["webservice/src/Library.Infrastructure/Library.Infrastructure.csproj", "src/Library.Infrastructure/"]
COPY ["webservice/src/Library.Domain/Library.Domain.csproj", "src/Library.Domain/"]
COPY ["webservice/src/Library.Application/Library.Application.csproj", "src/Library.Application/"]
RUN dotnet restore "src/Library.WebAPI/Library.WebAPI.csproj"
COPY webservice/src src
WORKDIR "/src/src/Library.WebAPI"
RUN dotnet build "Library.WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Library.WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Library.WebAPI.dll"]
