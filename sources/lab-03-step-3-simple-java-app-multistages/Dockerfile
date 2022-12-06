#============= STAGE 1 : Build =========

# Select the base image
FROM maven:3.6-jdk-8 as build

# Copy the project files
COPY ./pom.xml ./pom.xml

# Build all dependencies
RUN mvn dependency:go-offline -B

# Copy your other files
COPY ./src ./src

# Build for release
RUN mvn package

#============= STAGE 2 : Production  =========

# Set the production base image
FROM openjdk:8u171-jre-alpine

# Set deployment directory
WORKDIR /my-project

# Copy over the built artifact from the maven image
COPY --from=build  target/my-project*.jar ./target/

# Set the startup command to run your binary
CMD ["java", "-jar", "./target/my-project.jar"]