# Use Java 17
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy Maven files
COPY . .

# Build the app
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "target/*.jar"]
