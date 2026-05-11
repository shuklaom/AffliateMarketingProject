@echo off
REM Everyday Deals – start the Spring Boot backend
REM Prerequisites: JDK 21+, Maven 3.8+, MySQL running

REM Change to this script's directory so Maven finds pom.xml
cd /d "%~dp0"

REM Set DB password (override by setting DB_PASSWORD env var before calling this script)
if not defined DB_PASSWORD set DB_PASSWORD=

echo Starting Everyday Deals backend on http://localhost:8080 ...
mvn spring-boot:run
