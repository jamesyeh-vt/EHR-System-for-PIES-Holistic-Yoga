FROM ubuntu:latest

# ----- build -----
FROM maven:3.9.7-eclipse-temurin-17 as build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q -Pprod clean package -DskipTests

# ----- run -----
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/pies-her-api-*.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

ENV JAVA_OPTS="-Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=dev"