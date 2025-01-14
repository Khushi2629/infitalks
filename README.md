## About Me:

Name: **Khushi Pal**  
University: **Indian Institute of Technology Goa**   
Department: **Mechanical Engineering**  
Email: khushi.pal.22063@iitgoa.ac.in  



# InfiTalks Messaging Application

InfiTalks is a web-based real-time messaging platform where users can send messages, including images, either one-on-one or in groups. The platform also supports user registration, authentication, group chat functionalities, and a video calling feature (currently under development).

## Deployment
- I used [Vercel](https://vercel.com) to deploy the app.
- You can test and use the app by clicking the link: [InfiTalks](https://infitalks.vercel.app).
- If you'd like to set up the app locally, follow the instructions provided below in this file.

## Features

- User registration and authentication.
- Real-time messaging between users.
- Group chat functionality.
- Cloud-based image management via Cloudinary.
- Video calling (under development).
- Profile updates and logout functionality.

## Technology Stack

| **Component**       | **Technology**                | **Reason for Choosing**                                    |
|---------------------|-------------------------------|------------------------------------------------------------|
| Frontend Framework   | Next.js                       | Server-side rendering, routing, and fast frontend development.|
| State Management     | React Hooks                   | Simplified management of UI state across the app.            |
| Real-time Messaging  | Pusher                        | Scalable, easy-to-use real-time functionality.               |
| Database             | MongoDB Atlas                 | Scalable NoSQL database, suited for storing JSON-like documents.|
| Image Management     | Cloudinary                    | Cloud-based image storage with fast access and processing.   |
| Authentication       | NextAuth                      | Secure user authentication with support for sessions.        |
| Password Encryption  | bcryptjs                      | Secure password hashing for user credentials.                |

- Javascript and its library JSX is used as it provides readability and performance.
- Tailwind css is used for better UI as it provides responsiveness, reusability and scalability.
- For backend Node.js is used as it provides scalability, stability and synchronization.

## Database Design

MongoDB Atlas is used with three collections in the **InfiTalks** database:

1. **users**: Stores user details such as `username`, `email`, `password`, and `profilePicture`.
2. **chats**: Represents conversations between users or groups, containing metadata about the participants.
3. **messages**: Stores each message with `senderId`, `chatId`, `messageContent`, and optionally, image links.

## Dependencies

| **Library**            | **Version** | **Description**                                                                 |
|------------------------|-------------|---------------------------------------------------------------------------------|
| `@emotion/react`        | ^11.13.3    | CSS-in-JS library used for component styling.                                    |
| `@mui/icons-material`   | ^5.16.7     | Material UI icons for UI enhancement.                                            |
| `bcryptjs`              | ^2.4.3      | Used to hash passwords for secure storage.                                       |
| `mongodb`               | ^6.9.0      | MongoDB driver for connecting the app to MongoDB Atlas.                          |
| `mongoose`              | ^8.6.2      | ODM library for interacting with MongoDB.                                        |
| `next-auth`             | ^4.24.5     | Authentication library with session management.                                  |
| `next-cloudinary`       | ^5.20.0     | Cloudinary integration for uploading and managing images.                        |
| `pusher`                | ^5.2.0      | Pusher server-side library for real-time functionality.                          |
| `pusher-js`             | ^8.4.0      | Client-side Pusher library to handle real-time events.                           |
| `react-hook-form`       | ^7.53.0     | For handling form state and validation.                                          |
| `react-hot-toast`       | ^2.4.1      | For notifications and alerts in the app.                                         |
| `tailwindcss`           | ^3.4.11     | Utility-first CSS framework for fast UI design.                                  |

## Setup Instructions (on local machine)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/infitalks.git
cd infitalks
```

### 2. Install Dependencies
- Install all required libraries by running:

```bash
npm install @emotion/react @mui/icons-material bcryptjs mongodb mongoose next-auth next-cloudinary pusher pusher-js react-hook-form react-hot-toast tailwindcss
```

### 3. Environment Variables
- Set up environment variables by creating a .env file in the project root with the following:
- You have to create an account on Cloudinary to get NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, then you can replace your_cloudinary_name with your name on cloudinary.
- Cloudinary name will looks like something "dnrllthpq"(example)
- Please note that NEXTAUTH_SECRET can be any 32 bit random number in hexadecimal, you can generate it by running below command in vscode/linux/git terminal:

```bash
openssl rand -hex 32
```
- your .env file looks as follows:
```bash
MONGODB_URL=your_mondoDB_atlas_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_app_key
PUSHER_APP_ID=your_pusher_app_id
PUSHER_SECRET=your_pusher_secret
```

### 4. MongoDB Setup

Step 1: Sign Up or Log In to MongoDB Atlas

- Visit MongoDB Atlas
- Sign up for a free account if you don't have one, or log in if you already have an account

Step 2: Create a New Cluster

- Click on "Build a Cluster" or "Create a New Cluster"
- Choose a cloud provider (e.g., AWS, Azure, GCP), region, and cluster tier
- Select the free tier for free usage
- Click "Create Cluster"

Step 3: Set Up Cluster Security

- Go to "Network Access" from the sidebar
- Click "Add IP Address" and enter your IP or allow access from anywhere (0.0.0.0/0) for development purposes
  
Step 4: Create a Database User

- Go to "Database Access" from the sidebar
- Click "Add New Database User"
- Create a username and password
- Set the user permissions to "Atlas Admin" (for full access)
- Click "Add User"

Step 5: Get Your Connection String (MONGODB_URL)

- After the cluster is set up, go to the "Clusters" section and click "Connect" next to your cluster
- In the "Connect to your Cluster" window:
	+ Choose "Connect your application"
	+ Select your driver (e.g., Node.js) and the version
	+ You’ll see a connection string in the following format(may vary slightly):

```bash
mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

- Add that url in .env file in your project at your_mondoDB_atlas_url & make sure that you replace username and password with the credentials you set in step 4.



### 5. Pusher Setup

- Follow these steps to obtain the Pusher credentials (app ID, key, secret, and cluster) required to use Pusher in your project.

Step 1: Sign Up or Log In to Pusher (Pusher channel, not pusher beams)

- Visit [Pusher](https://pusher.com/).
- If you don’t have an account, sign up for a free one. If you already have an account, log in.

Step 2: Create a New App

1. After logging in, go to your **Pusher Dashboard**.
2. Click on **"Create New App"**.
3. In the **"Create New App"** window:
   - Enter a name for your app (e.g., "My Messaging App").
   - Select a **Cluster** (e.g., `us2`, `eu`, etc.) based on your location.
   - Under **App type**, choose **"Channels"**.
   - Click **"Create App"**.

Step 3: View Your App Credentials

-Once your app is created, Pusher will display the following credentials:

- **App ID**: A unique identifier for your Pusher app.
- **Key**: The public key to authenticate your app with Pusher.
- **Secret**: The private key used for securing communication.
- **Cluster**: The region-specific server cluster your app is hosted on.

### Example of Credentials:

```bash
App ID: 123456
Key: abcd1234efgh5678
Secret: zxy98765vwxyz4321
Cluster: us2
```

- Put those credentials in your .env file as in above example.
- **Also note that in this project I used Cluster name directly in pusher.js file (inside lib folder), so you have to explicitly change the cluster name there in that file.**
- **Then you do not need the cluster name in .env file.**




### 5. Start the Application
- To run the development server:
```bash
npm run dev
```

- The app will be available at http://localhost:3000
- **If you will get any error in app, then you may try refreshing your browser.**


# Usage

### Sign Up
- Register with your email, username, and password.

### Login
- Log in with your registered email and password.

### Messaging
- Start individual or group chats.

### Group Chat
- Create group chats by selecting multiple contacts and assigning a group name.

### Pictures
- Users can set profile picture.
- Users can share pictures via [Cloudinary](https://cloudinary.com/).

### Real-Time Messaging
- Messages are delivered in real-time using [Pusher](https://pusher.com/).

### Video Calling (Under Development)
- A basic video calling feature is under development.


# Important:
- **I have used the free/trial version of pusher, mongoDB atlas and cloudinary, so when they reach their usage limit some functions may not work.**
- **So, to make it scalable for large number of users on the app, we need to buy subscription of the required platforms accordingly.**

# Future Development

- Full implementation of the calling feature is planned.
- Further enhancements to improve the user interface and user experience.

# Contribution

Feel free to contribute to this project by submitting a pull request. Follow the standard Git workflow when contributing:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

# License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
