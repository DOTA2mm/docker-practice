FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE test
ENV MYSQL_USER Chuck
ENV MYSQL_PASSWORD 123

ADD init_db.sql /docker-entrypoint-initdb.d/
