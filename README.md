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
  * POST `/reviews/:roomId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
  {
    "id": "Number",
    "_roomId": "Number",
    "user_name": "String",
    "user_image": "String",
    "user_url": "String",
    "date": "Date",
    "text": "String",
    "scores": {
      "cleanliness": "Number",
      "communication": "Number",
      "check_in": "Number",
      "accuracy": "Number",
      "location": "Number",
      "value": "Number"
    }
  }
```
### Read review --------------------------------------
  * GET `/reviews/:roomId/:id`

**Path Parameters:**
  * `roomId` lodging ID
  * `id` review ID

**Success Status Code:** `200`

**Returns:** JSON

```json
  {
    "id": "Number",
    "_roomId": "Number",
    "user_name": "String",
    "user_image": "String",
    "user_url": "String",
    "date": "Date",
    "text": "String",
    "scores": {
      "cleanliness": "Number",
      "communication": "Number",
      "check_in": "Number",
      "accuracy": "Number",
      "location": "Number",
      "value": "Number"
    }
  }
```



### Update review --------------------------------------
  * PATCH `/reviews/:roomId/:id`

**Path Parameters:**
  * `roomId` lodging ID
  * `id` review ID

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
  {
    "_roomId": "Number",
    "date": "Date",
    "text": "String",
    "scores": {
      "cleanliness": "Number",
      "communication": "Number",
      "check_in": "Number",
      "accuracy": "Number",
      "location": "Number",
      "value": "Number"
    }
  }
```

### Delete review --------------------------------------
  * DELETE `/reviews/:roomId/:id`

**Path Parameters:**
  * `roomId` lodging ID
  * `id` review ID

**Success Status Code:** `204`
