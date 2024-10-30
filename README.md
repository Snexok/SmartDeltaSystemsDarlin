Для запуска проекта в Docker, нужно ввести в терминал следующие команды:

<code>./back/mvnw -f ./back/pom.xml clean package
docker-compose up --build</code>

После этого можно открыть ссылку front части приложения</br>
http://localhost

API доступно по url</br>
http://localhost:8081/api/v1

Curl запросы:

<b>Запрос на получение всех студентов</b></br></br>
curl -X GET "http://localhost:8081/api/v1/student" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"

<b>Запрос на добавление студента</b></br></br>
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

<b>Запрос на обновление студента</b></br></br>
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

<b>Запрос на удаление студента</b></br></br>
curl -X DELETE "http://localhost:8081/api/v1/student/{id}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}"
