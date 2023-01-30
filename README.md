[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Backend для проекта "Mesto"

:exclamation:С 26.11.2022 разработка проекта ведется в общем с фронтендом репозитории - https://github.com/dromgard/react-mesto-api-full

### Описание проекта:

Backend реализован на ExpressJS, MongoDB + Mongoose. Реализована валидация данных на уровне схемы. Backend обрабатывает регистрацию, авторизацию, сохранение и удаление карточек, изменение данных пользователя.

### Технологии:

<img src="https://img.shields.io/badge/Node.js-blue?logo=node.js&logoColor=white" alt="node.js" title="node.js"/> <img src="https://img.shields.io/badge/ExpressJS-blue?logo=express&logoColor=white" alt="ExpressJS" title="ExpressJS"/> <img src="https://img.shields.io/badge/MongoDB-blue?logo=MongoDB&logoColor=white" alt="MongoDB" title="MongoDB"/>

- Для хранения данных используется MongoDB + Mongoose.
- Реализована валидация данных на уровне схемы.

### Публикация в интернете:

[Backend - https://api.dromgard.nomoredomains.club/](https://api.dromgard.nomoredomains.club/)

### Запуск проекта

Требования:

- Node.js >= 14;
- npm >= 6.14;

Backend:

- `npm run start` — запускает сервер в режиме production.
- `npm run dev` — запускает сервер с hot-reload в режиме разработчика.
