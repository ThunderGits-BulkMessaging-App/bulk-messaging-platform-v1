Certainly! Below is a comprehensive API documentation for your contact management system. This documentation includes details for all the API endpoints, including their purposes, required parameters, and example request and response formats.

### API Documentation for Contact Management System

#### Base URL
`https://api.yourdomain.com`

All endpoints listed below require authentication. Authentication should be handled via a Bearer token included in the header of each request.

**Header Example**:
```
Authorization: Bearer {access_token}
```

---

### Endpoints

#### 1. **Create Contact**
- **Endpoint**: `POST /contacts`
- **Purpose**: Adds a new contact to the database.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {access_token}`
- **Request Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "1234567890",
    "email": "john.doe@example.com",
    "address": "1234 Maple Street",
    "groupName": "Friends"
  }
  ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "message": "Contact created successfully",
      "contact": {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "1234567890",
        "email": "john.doe@example.com",
        "address": "1234 Maple Street",
        "groups": ["5f2babc1234567890abcdefg"]
      }
    }
    ```

#### 2. **Get All Contacts**
- **Endpoint**: `GET /contacts`
- **Purpose**: Retrieves all contacts from the database.
- **Headers**:
  - `Authorization: Bearer {access_token}`
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    [
      {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "1234567890",
        "email": "john.doe@example.com",
        "address": "1234 Maple Street",
        "groups": ["5f2babc1234567890abcdefg"]
      },
      {
        "id": "2",
        "firstName": "Jane",
        "lastName": "Smith",
        "phoneNumber": "0987654321",
        "email": "jane.smith@example.com",
        "address": "5678 Oak Street",
        "groups": ["5f2babc1234567890hijklmn"]
      }
    ]
    ```

#### 3. **Update Contact**
- **Endpoint**: `PUT /contacts/{id}`
- **Purpose**: Updates an existing contact.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {access_token}`
- **Path Parameters**:
  - `id`: ID of the contact to update
- **Request Body**:
  ```json
  {
    "email": "update.john.doe@example.com"
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Contact updated successfully",
      "contact": {
        "id": "1",
        "firstName": "John",
        "lastName": "Doe",
        "phoneNumber": "1234567890",
        "email": "update.john.doe@example.com",
        "address": "1234 Maple Street",
        "groups": ["5f2babc1234567890abcdefg"]
      }
    }
    ```

#### 4. **Delete Contact**
- **Endpoint**: `DELETE /contacts/{id}`
- **Purpose**: Deletes a contact from the database.
- **Headers**:
  - `Authorization: Bearer {access_token}`
- **Path Parameters**:
  - `id`: ID of the contact to delete
- **Response**:
  - **Status Code**: `204 No Content`
  - **Body**: None

#### 5. **Bulk Upload Contacts**
- **Endpoint**: `POST /contacts/upload`
- **Purpose**: Allows uploading a CSV file to bulk import contacts.
- **Headers**:
  - `Content-Type: multipart/form-data`
  - `Authorization: Bearer {access_token}`
- **FormData**:
  - `file`: CSV file containing contacts data
- **Response**:
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "message": "Contacts uploaded successfully",
      "contactsUploaded": 20
    }
    ```

### Testing the API
You can test these APIs using tools like Postman or curl. Ensure you replace `{access_token}` with your actual access token received from the authentication process, and adjust the base URL to match your deployed API's URL.