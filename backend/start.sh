#!/usr/bin/env bash
# Everyday Deals – start the Spring Boot backend
# Prerequisites: JDK 21+, Maven 3.8+, MySQL running

set -e
echo "Starting Everyday Deals backend on http://localhost:8080 ..."
mvn spring-boot:run
