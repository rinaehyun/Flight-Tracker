FROM --platform=linux/amd64 openjdk:21

EXPOSE 8080

COPY backend/target/flight-app.jar flight-app.jar

ENTRYPOINT ["java", "-jar", "flight-app.jar"]