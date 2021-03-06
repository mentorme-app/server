# MentorMe - back end

[![Travis](https://img.shields.io/travis/com/mentorme-app/server.svg)](https://travis-ci.com/mentorme-app/server/builds/117393989)
[![Build Status](https://travis-ci.com/mentorme-app/server.svg?branch=master)](https://travis-ci.com/mentorme-app/server)

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
    "phone_number": null,
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
    "phone_number": null,
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
    "phone_number": null,
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

**Payload:** an object containing the User property/properties you want to update.

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
    "phone_number": null,
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
    title: 'Autem reprehenderit perferendis et cumque libero.',
    question: 'Iusto optio nihil a facere quaerat ut libero.',
    tag: {
      tag: '',
      id: 1
    },
    author: {
      id: 1,
      username: 'Delphia26',
      email: 'Branson_Buckridge10@yahoo.com',
      phone_number: '(324) 778-4260',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      motto: 'Veniam in non optio maiores doloribus.',
      description: 'Nihil ut libero voluptatem est quis. '
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
        phone_number: "(951) 324-8429 x1770",
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
        "phone_number": "(951) 324-8429 x1770",
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

# Conversations

## [GET] All conversations for a question

**URL:** `/api/conversation?qid=1`

**Query string:** `qid` query string with question_id

**Returns:** an array of objects with conversations for specific question.

Example:

```js
[
  {
    id: 1,
    question_id: 1,
    mentor_id: 3,
    author_id: 1
  },
  {
    id: 2,
    question_id: 1,
    mentor_id: 4,
    author_id: 2
  }
];
```

## [GET] Conversation by ID

**URL:** `/api/conversations/:id`

**Params:** Valid conversation ID.

**Returns:** an object conversation data and list of messages.

Example:

```js
{
    "id": 6,
    "question_id": 6,
    "mentor_id": 1,
    "created_at": "2019-06-25 15:24:37",
    "updated_at": "2019-06-25 15:24:37",
    "author": {
        "id": 3,
        "username": "Delphia26",
        "email": "Branson_Buckridge10@yahoo.com",
        "phone_number": "(324) 778-4260",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "motto": "Veniam in non optio maiores doloribus.",
        "description": "Nihil ut libero voluptatem est quis",
        "tag": ""
    },
    "mentor": {
        "id": 1,
        "username": "Jace_Frami",
        "email": "Jettie85@yahoo.com",
        "phone_number": "072-906-3922 x52579",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "motto": "Fugiat adipisci qui libero qui amet et neque cupiditate sint.",
        "description": "Quas quam asperiores.",
        "tag": "Marketing"
    },
    "messages": [
        {
            "id": 16,
            "sender": 1,
            "text": "Hey, I can help you!",
            "conversation_id": 6,
            "created_at": "2019-06-25 15:27:44",
            "updated_at": "2019-06-25 15:27:44"
        },
        {
            "id": 18,
            "sender": 3,
            "text": "Do you have experience with this?",
            "conversation_id": 6,
            "created_at": "2019-06-25 15:33:55",
            "updated_at": "2019-06-25 15:33:55"
        }
    ]
}
```

## [GET] All conversations for a user

**URL:** `/api/conversations/user/:id`

**Params:** Valid user ID.

**Returns:** an array with conversation objects.

Example:

```js
[
  {
    id: 1,
    question_id: 1,
    mentor_id: 3,
    author_id: 1
  },
  {
    id: 7,
    question_id: 6,
    mentor_id: 1,
    author_id: 2
  }
];
```

## [POST] New conversation

**URL:** `/api/conversation`

**Payload:** an object with the following properties.

```js
{
    "mentor_id": 2,
    "question_id": 6
}
```

**Returns:** new conversation data.

**Twilio:** When a new conversation is started for a question and if the author of the question provided his phone number, he will be notified about it via SMS.

Example:

```js
{
    "id": 8,
    "question_id": 6,
    "mentor_id": 2,
    "author_id": 3,
    "created_at": "2019-06-25 16:02:24",
    "updated_at": "2019-06-25 16:02:24"
}
```

# Messages

## [POST] New message

**URL:** `/api/messages`

**Payload:** an object with the following properties.

```js
{
	"sender": 1,
	"text": "I did not!",
	"conversation_id": 6
}
```

**Returns:** new conversation data.

Example:

```js
{
    "id": 20,
    "sender": 1,
    "text": "I did not!",
    "conversation_id": 6,
    "created_at": "2019-06-25 16:06:41",
    "updated_at": "2019-06-25 16:06:41"
}
```
