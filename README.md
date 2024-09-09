### Setup

1. **Install Dependencies:**
   To install all the required dependencies, run the following command in your project root:

   ```bash
   npm install

   ```

2. **Environment Configuration:**
   Create a .env file in the root directory with the following configuration

   1. NEXT_PUBLIC_BASE_URL=http://localhost:4000

3. **Running the Application:**
   npm run dev
   This will start the app at http://localhost:3000

4. **Get Test Url:**
   Create a test unique url with admin login from the postman for the test
   Once the test is created, the response will contain a uniqueURL which can be used to generate a test URL for users. The URL format is: http://localhost:3000/tests/<uniqueUrlId>
