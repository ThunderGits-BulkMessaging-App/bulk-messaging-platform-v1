#### Base URL
- **Base URL:** `{BASE_URL}/user`
- **Note:** Replace `{BASE_URL}` with the actual base URL where your backend is hosted.

#### Authentication
- **Auth Required:** Yes (for protected routes)
- **Auth Type:** Bearer Token
- **Header:** 
  - Key: `Authorization`
  - Value: `Bearer {token}`
- **Description:** Secure routes require a JWT token in the header. The token should be prefixed by the keyword 'Bearer' followed by a space. Example: `Authorization: Bearer your.jwt.token.here`

#### API Endpoints

1. **Add Group**
   - **Endpoint:** `/addgroup`
   - **Method:** POST
   - **Auth Required:** Yes
   - **Headers:**
     - `Authorization`: `Bearer {token}`
   - **Body:**
     ```json
     {
       "name": "Group Name",
       "emails": ["email1@example.com", "email2@example.com"],
       "userId": "userIdValue"
     }
     ```
   - **Description:** Creates a new group with the specified name, emails, and user association.

2. **Send Mails**
   - **Endpoint:** `/sendmail`
   - **Method:** POST
   - **Auth Required:** Yes
   - **Headers:**
     - `Authorization`: `Bearer {token}`
   - **Body:**
     ```json
     {
       "groupId": "groupIdValue",
       "templateId": "templateIdValue"
     }
     ```
   - **Description:** Sends emails to members of a specified group using a designated template.

3. **View Groups**
   - **Endpoint:** `/viewgroups`
   - **Method:** GET
   - **Auth Required:** Yes
   - **Headers:**
     - `Authorization`: `Bearer {token}`
   - **Description:** Retrieves all groups associated with the authenticated user.

4. **Delete Group**
   - **Endpoint:** `/deletegroup/:id`
   - **Method:** POST
   - **Auth Required:** No
   - **Params:**
     - `id`: The ID of the group to delete
   - **Description:** Deletes a specified group by its ID.

5. **New Template**
   - **Endpoint:** `/newtemplate`
   - **Method:** POST
   - **Auth Required:** Yes
   - **Headers:**
     - `Authorization`: `Bearer {token}`
   - **Body:**
     ```json
     {
       "name": "Template Name",
       "content": "Email content here..."
     }
     ```
   - **Description:** Creates a new email template with a given name and content.

6. **Delete Template**
   - **Endpoint:** `/deletetemplate/:id`
   - **Method:** POST
   - **Auth Required:** No
   - **Params:**
     - `id`: Template ID to delete
   - **Description:** Deletes the specified email template.

7. **View Templates**
   - **Endpoint:** `/viewtemplates`
   - **Method:** GET
   - **Auth Required:** Yes
   - **Headers:**
     - `Authorization`: `Bearer {token}`
   - **Description:** Retrieves all email templates available to the authenticated user.

8. **Sent Details**
   - **Endpoint:** `/sentdetails`
   - **Method:** GET
   - **Auth Required:** Yes
   - **Headers:**
     - `Authorization`: `Bearer {token}`
   - **Description:** Provides details of all emails sent by the authenticated user.

9. **Dashboard**
   - **Endpoint:** `/dashboard`
   - **Method:** GET
   - **Auth Required:** Yes
   - **Headers::
     - `Authorization`: `Bearer {token}`
   - **Description:** Accesses dashboard data for the authenticated user.
