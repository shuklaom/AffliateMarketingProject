@echo off
REM Everyday Deals – start the Spring Boot backend
REM Prerequisites: JDK 21+, Maven 3.8+, MySQL running

REM Change to this script's directory so Maven finds pom.xml
cd /d "%~dp0"

REM Supply DB_PASSWORD through the terminal or a local, ignored .env loader.
if not defined DB_URL set "DB_URL=jdbc:mysql://localhost:3306/everydaydeals?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true"
if not defined DB_USERNAME set "DB_USERNAME=root"
if not defined DB_PASSWORD (
	echo ERROR: DB_PASSWORD is not set.
	echo Set it before starting, for example: set "DB_PASSWORD=your_password"
	exit /b 1
)

echo Starting Everyday Deals backend on http://localhost:8080 ...
mvn spring-boot:run
