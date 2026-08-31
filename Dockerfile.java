FROM eclipse-temurin:21-jdk-alpine

RUN apk add --no-cache bash coreutils

WORKDIR /sandbox

# Pre-create directories for execution
RUN mkdir -p /sandbox/input /sandbox/output

# Default: do nothing (we'll copy and compile at runtime)
CMD ["echo", "Java executor ready"]
