Для запуска проекта в Docker, нужно ввести в терминал следующие команды:
./back/mvnw -f ./back/pom.xml clean package
docker-compose up --build

После этого можно открыть ссылку front части приложения
http://localhost

API доступно по url http://localhost:8081/api/v1

Curl запросы:

Запрос на оплучение всех студентов
curl -X GET "http://localhost:8081/api/v1/student" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"

Запрос на добавление студента
curl -X POST "http://localhost:8081/api/v1/student" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
        "id": 1,
        "name": "Иван",
        "secondName": "Иванов",
        "patronymic": "Иванович",
        "groupName": "ИС-21",
        "avgRating": 4.5
      }'

Запрос на обновление студента
curl -X PUT "http://localhost:8081/api/v1/student" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Пётр",
        "secondName": "Петров",
        "patronymic": "Петрович",
        "groupName": "ИС-22",
        "avgRating": 4.7
      }'

Запрос на удаление студента
curl -X DELETE "http://localhost:8081/api/v1/student/{id}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
