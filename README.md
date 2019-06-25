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

# Tags

## [GET] All tags

**URL:** `/api/tags`

**Returns:** an array of objects with tags.

Example:

```js
[
  {
    id: 1,
    tag: 'Photography',
    created_at: '2019-06-25 07:32:52',
    updated_at: '2019-06-25 07:32:52'
  },
  {
    id: 2,
    tag: 'Marketing',
    created_at: '2019-06-25 07:32:52',
    updated_at: '2019-06-25 07:32:52'
  }
];
```

# Questions

## [GET] All questions

**URL:** `/api/questions`

**Returns:** an array of objects with questions.

Example:

```js
[
  {
    id: 1,
    title: 'Dolores ut aut reiciendis quasi.',
    question: 'Quas debitis lau ',
    isAnswered: 0,
    created_at: '2019-06-25 11:49:12',
    updated_at: '2019-06-25 11:49:12',
    tag: {
      tag: '',
      id: 1
    },
    author: {
      id: 1,
      username: 'Danika_Rolfson35',
      email: 'Claudia36@gmail.com',
      avatar: null,
      motto: 'Tempore est corrupti nemo beatae omnis aut consequatur.',
      description: 'Deserunt ut mpore minus voluptatibus ipsam. Excepturi .'
    }
  }
];
```

## [GET] Question by ID

**URL:** `/api/questions/:id`

**Params:** Valid question ID.

**Returns:** an object with question.

Example:

```js
{
    id: 1,
    title: 'Dolores ut aut reiciendis quasi.',
    question: 'Quas debitis lau ',
    isAnswered: 0,
    created_at: '2019-06-25 11:49:12',
    updated_at: '2019-06-25 11:49:12',
    tag: {
        tag: '',
        id: 1
    },
    author: {
        id: 1,
        username: 'Danika_Rolfson35',
        email: 'Claudia36@gmail.com',
        avatar: null,
        motto: 'Tempore est corrupti nemo beatae omnis aut consequatur.',
        description: 'Deserunt ut mpore minus voluptatibus ipsam. Excepturi .'
    }
}

```

## [POST] New question

**URL:** `/api/questions`

**Payload:** an object with the following properties.

```js
{
	"title": "How do I sell my product?",
	"question": "I have this great product",
	"author_id": 6,
	"tag_id": 3
}
```

**Returns:** an object with question data.

Example:

```js
{
    "id": 8,
    "title": "How do I sell my product?",
    "question": "I have this great product",
    "isAnswered": 0,
    "created_at": "2019-06-25 13:33:13",
    "updated_at": "2019-06-25 13:33:13",
    "author": {
        "id": 6,
        "username": "Bob",
        "email": "bob@test.com",
        "avatar": null,
        "motto": null,
        "description": null,
        "tag": ""
    },
    "tag": {
        "id": 3,
        "tag": "Marketing",
        "created_at": "2019-06-25 11:49:12",
        "updated_at": "2019-06-25 11:49:12"
    }
}
```

## [DELETE] Question by ID

**URL:** `/api/questions/:id`

**Params:** Valid question ID.

**Returns:** a confirmation message

Example:

```js
{
    "message": "Resource with ID 6 was deleted"
}
```
