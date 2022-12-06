FROM maven:3.6-jdk-8

# Copy the pom.xml file
COPY ./pom.xml ./pom.xml

# Download all dependencies for offline use
RUN mvn dependency:go-offline -B
COPY ./src ./src
RUN mvn package 
CMD ["java", "-jar", "./target/my-project.jar"]