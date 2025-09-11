FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -q -e -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
ENV SERVER_PORT=4041
ENV RAZORPAY_KEY=rzp_test_change_me
ENV RAZORPAY_SECRET=rzp_secret_change_me
COPY --from=build /app/target/*.jar app.jar
EXPOSE 4041
ENTRYPOINT ["java","-jar","/app/app.jar"]

