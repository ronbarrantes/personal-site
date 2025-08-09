# syntax=docker/dockerfile:1
FROM golang:1.22-alpine AS build
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o poster

FROM gcr.io/distroless/base-debian12
ENV POSTER_PORT=8081
WORKDIR /
COPY --from=build /app/poster /poster
USER nonroot:nonroot
EXPOSE 8081
ENTRYPOINT ["/poster"]