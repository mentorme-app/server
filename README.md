# MentorMe - back end

MentorMe lets you lend your business skills to an entrepreneurs across the globe. New entrepreneurs often have a lot of questions, and don’t always have a mentor to ask. As an entrepreneur, whenever you need business advice, our volunteers are happy to help. By posting your questions, you can communicate directly and solve a problem. As an experience business owner you can help pay it forward just by installing the MentorMe app.

## MVP features

1. An on-boarding process for an entrepreneur
2. On-boarding process for a volunteer experienced business owner
3. Ability to easily create and post a question (including title, question, tagged business type, and optional photos/files)
4. Ability to easily edit / delete a question
5. Ability for anyone to easily search / find posted questions
6. Ability to respond to a posted question via message
7. Use a notification API like Twilio (https://www.twilio.com/) or Growl (http://growl.info/) to allow volunteers to be notified when a question is posted in their business type.

**Stretch:** Allow photos or files to be attached to a posted question. Allow an entrepreneur to request a call with a mentor for a fee.

## Design Links / Data Sets

https://xd.adobe.com/spec/d5d00464-bbfc-4d37-403a-fec60f25c36a-a3e1/

# API documentation

# Authentication

## [POST] registration

**URL:** `/api/auth/register`

**Payload:** an object with the following properties.

```js
{
  "email": "joe@test.com",
  "username": "Joe",
  "password": "1234567"
}
```

**Returns:** an object with user data and authentication token.

Example:

```js
{
  "user": {
    "id": 1,
    "username": "Joe",
    "email": "joe@test.com",
    "avatar": null,
    "motto": null,
    "description": null,
    "tag": "Sales",
    "created_at": "2019-06-24T14:36:20.727Z",
    "updated_at": "2019-06-24T14:36:20.727Z"
    },
  "token": "<hidden>"
}
```

## [POST] login

**URL:** `/api/auth/login`

**Payload:** an object with the following properties.

```js
{
  "email": "joe@test.com",
  "password": "1234567"
}
```

**Returns:** an object with user data and authentication token.

Example:

```js
{
  "user": {
    "id": 1,
    "username": "Joe",
    "email": "joe@test.com",
    "avatar": null,
    "motto": null,
    "description": null,
    "tag": "Sales",
    "created_at": "2019-06-24T14:36:20.727Z",
    "updated_at": "2019-06-24T14:36:20.727Z"
    },
  "token": "<hidden>"
}
```

# Users

## [GET] User by ID

**URL:** `/api/user/:id`

**Params:** Valid user ID.

**Returns:** an object with user data.

Example:

```js
{
  "user": {
    "id": 1,
    "username": "Joe",
    "email": "joe@test.com",
    "avatar": null,
    "motto": null,
    "description": null,
    "tag": "Sales",
    "created_at": "2019-06-24T14:36:20.727Z",
    "updated_at": "2019-06-24T14:36:20.727Z"
    }
}
```

## [PUT] User

**URL:** `/api/user/:id`

**Params:** Valid user ID.

**Payload:** an object containing the property/properties you want to update.

```js
{
  "email": "joeCoolDude@test.com",
  "password": "abcdefgh"
}
```

**Returns:** an object with user data.

Example:

```js
{
  "user": {
    "id": 1,
    "username": "Joe",
    "email": "joeCoolDude@test.com",
    "avatar": null,
    "motto": null,
    "description": null,
    "tag": "Sales",
    "created_at": "2019-06-24T14:36:20.727Z",
    "updated_at": "2019-06-24T14:36:20.727Z"
    }
}
```
