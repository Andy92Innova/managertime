#!/bin/bash
set -e

# CREATE USER docker;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	
	CREATE DATABASE managertime;
	GRANT ALL PRIVILEGES ON DATABASE managertime TO postgres;
EOSQL