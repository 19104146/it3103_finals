# IT 3103 Final Project

## Getting Started

Clone the project repository and initialize the docker environment:

```sh
git clone https://github.com/19104146/it3103_finals.git
cd it3103_finals
cp .env.example .env
docker compose up --build -d
```

### Set Up SuiteCRM (CRM)

1. Generate OAuth2 client keys:

   ```sh
   docker exec -it {CONTAINER_ID} bash
   root@{CONTAINER_ID}:/# ./opt/bitnami/scripts/suitecrm/bootstrap.sh
   ```

   > NOTE:
   >
   > - Use the docker image `bitnami/suitecrm:8.7.1`
   > - Replace `{CONTAINER_ID}` with the actual container ID from `docker ps`

2. Access SuiteCRM at `http://localhost:8001`

3. Log in using the `CRM_USERNAME` and `CRM_PASSWORD` from your `.env` file

4. Configure OAuth2 Client Credentials:

   - Click the user icon in the upper right corner
   - Select "Admin"
   - Navigate to **Users & Authentication**
   - Click on **OAuth2 Clients and Tokens**
   - Open the dropdown and select **New Client Credentials**
   - Complete the required fields
   - Create the client

5. Secure your credentials:

   - Copy the generated **Client ID**
   - Safely store the **Client Secret**

6. Obtain an API Access Token:

   - Use Postman or Bruno as your API client
   - Select OAuth2 Credentials
   - Set Access Token URL to `http://localhost:8001/legacy/Api/access_token`
   - Input your Client ID and Client Secret
   - Retrieve the access token

7. Update your `.env`:
   - Paste the obtained access token in `CRM_API_KEY`

### Set Up Snipe-IT (IMS)

1. Open Snipe-IT at `http://localhost:8002`

2. Complete the initial setup wizard

3. Generate API Key:

   - Click the account button in the navigation bar
   - Select **Manage API Keys**
   - Create and copy your API key

4. Update your `.env`:
   - Paste the API key in `IMS_API_KEY`

### Re-initialize Helpdesk and Gateway

Reload the images to apply environment variables:

```sh
docker compose up --build -d helpdesk gateway
```
