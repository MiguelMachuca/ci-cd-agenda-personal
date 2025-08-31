FROM maven:3.8.6-openjdk-11-slim AS build

WORKDIR /app

# Copiar primero solo los archivos de Maven
COPY pom.xml .

# Descargar dependencias
RUN mvn dependency:resolve-plugins dependency:resolve -B

# Copiar el código fuente
COPY src ./src

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Segunda etapa: Runtime
FROM openjdk:11-jre-slim

RUN groupadd -r appuser && useradd -r -g appuser appuser
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN chown appuser:appuser app.jar
USER appuser
EXPOSE 8080
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE="docker"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]