FROM maven:3.8.3-openjdk-17 as build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
#COPY target/SmartDeltaSystems-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /target/SmartDeltaSystems-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
