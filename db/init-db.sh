
DB_HOST=${DB_HOST:-localhost}
DB_USER=${DB_USER:-sa}
DB_PASSWORD=${DB_PASSWORD:-teste}
DB_NAME=${DB_NAME:-DogRestaurant}

sleep 30s

DB_EXISTS=$(/opt/mssql-tools/bin/sqlcmd -S $DB_HOST -U $DB_USER -P $DB_PASSWORD -Q "IF DB_ID('$DB_NAME') IS NOT NULL PRINT 'EXISTS'" -h -1)

if [ "$DB_EXISTS" != "EXISTS" ]; then
  /opt/mssql-tools/bin/sqlcmd -S $DB_HOST -U $DB_USER -P $DB_PASSWORD -Q "CREATE DATABASE [$DB_NAME]"
  echo "Database $DB_NAME created."
else
  echo "Database $DB_NAME already exists."
fi