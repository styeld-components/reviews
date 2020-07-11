# `reviews` overview
This component renders a reviews module for a lodging rental app page.

# setup
- run npm install in root directory
- run below scripts (found in package.json):
  - npm run seed
  - npm run webpack
  - npm start

# API Routes

## Server API

### Create review --------------------------------------
  * POST `/:roomId/reviews`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys

```json
  {
    "id": "Number",
    "roomId": "Number",
    "username": "String",
    "userImg": "String",
    "userId": "Number",
    "date": "Date",
    "body": "String",
    "score": "Number",
    "cleanliness": "Number",
    "communication": "Number",
    "checkIn": "Number",
    "accuracy": "Number",
    "location": "Number",
    "value": "Number"
  }
```
### Read single review --------------------------------------
  * GET `/:roomId/reviews/:id`

**Path Parameters:**
  * `roomId` lodging ID
  * `id` review ID

**Success Status Code:** `200`

**Returns:** JSON

```json
  {
    "id": "Number",
    "roomId": "Number",
    "username": "String",
    "userImg": "String",
    "userId": "Number",
    "date": "Date",
    "body": "String",
    "score": "Number",
    "cleanliness": "Number",
    "communication": "Number",
    "checkIn": "Number",
    "accuracy": "Number",
    "location": "Number",
    "value": "Number"
  }
```



### Update review --------------------------------------
  * PATCH `/:roomId/reviews/:id`

**Path Parameters:**
  * `roomId` lodging ID
  * `id` review ID

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
  {
    "roomId": "Number",
    "date": "Date",
    "body": "String",
    "score": "Number",
    "cleanliness": "Number",
    "communication": "Number",
    "checkIn": "Number",
    "accuracy": "Number",
    "location": "Number",
    "value": "Number"
  }
```

### Delete review --------------------------------------
  * DELETE `/:roomId/reviews/:id`

**Path Parameters:**
  * `roomId` lodging ID
  * `id` review ID

**Success Status Code:** `204`
