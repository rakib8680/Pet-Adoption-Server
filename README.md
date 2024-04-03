# 🐾 Pet Adoption Platform 🐾

🔗 **Live Project**: [Pet Adoption Platform](https://pet-adoption-server-new.vercel.app/)

## 📝 Project Overview

Welcome to the **Pet Adoption Platform**! Our mission is to connect adorable pets with loving homes. This platform is designed to make the process of finding your perfect pet match as easy and enjoyable as possible. Whether you're looking to adopt a pet or add one for adoption, we've got you covered!

## 🚀 Features

Our platform is packed with features that allow you to:

- 🐕 **View a list of pets available for adoption**: Browse through our extensive list of pets waiting for their forever home.

- 🔍 **Filter pets based on their type, breed**: Find your perfect pet match by filtering based on your preferred pet type and breed.

- 📋 **View details of a pet**: Get to know more about a pet by viewing their detailed profile.

- ❤️ **Adopt a pet**: Found your perfect pet match? Go ahead and adopt them!

- ➕ **Add a pet for adoption**: Have a pet that needs a new home? Add them to our platform for adoption.

- 🔄 **Update pet details**: Keep your pet's profile up-to-date with the latest information.

Join us in our journey to make pet adoption easier and more accessible for everyone!

## 🚀 Getting Started with Pet Adoption Platform

Follow these steps to set up the project locally:

1. **📥 Clone the Project**

   Use the following command in your terminal to clone the project repository:

   ```bash
   git clone <https://github.com/rakib8680/pet-adoption-server>
   ```

2. **📂 Navigate to the Project Directory**

   Change your current directory to the project directory:

   ```bash
    cd pet-adoption-server
   ```

3. **🔧 Install Dependencies**

   Install all the necessary dependencies using npm:

   ```bash
    npm install
   ```

4. **🎉 Start the Project**

   Finally, start the project with the following command:

   ```bash
    npm run dev
   ```

## 🌍 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. Don't forget to replace the placeholders with your actual values!

```env
🚪 PORT=your_port_number
🗄️ DATABASE_URL=your_database_url
🔐 JWT_ACCESS_SECRET=your_jwt_access_secret
⏳ JWT_EXPIRES_IN=your_jwt_expiration_time
🌐 NODE_ENV=your_node_environment

```

Each of these variables plays a crucial role in the configuration of your application. Make sure to keep them safe!

# 🛠️ Tech Stack

This project is built with a powerful set of technologies to ensure high performance, security, and scalability. Here's a quick overview:

- 🚀 **Server**:

  - [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [Nodemon](https://nodemon.io/),[Dotenv](https://www.npmjs.com/package/dotenv), [Cors](https://www.npmjs.com/package/cors),[Vercel](https://vercel.com/)

- 🧪 **Validation**:

  - [Zod](https://www.npmjs.com/package/zod), [EsLint](https://eslint.org/), [Prettier](https://prettier.io/),
    [Bcrypt](https://www.npmjs.com/package/bcrypt), [JWT](https://jwt.io/)

- 🗄️ **Database**:

  - [PostgreSQL](https://www.postgresql.org/): An open-source relational database management system.
  - [Prisma](https://www.prisma.io/): A modern database toolkit that simplifies database access.

- 🔐 **Authentication**: [JWT](https://jwt.io/), [Bcrypt](https://www.npmjs.com/package/bcrypt)

- 🚀 **Deployment**: [Vercel](https://vercel.com/)

Click on any of the technologies to learn more about them!

## 🌟 Project Features

- 🐾 **Add a Pet for Adoption**
- 🔄 **Update Pet Details**
- 📋 **View Details of a Pet**
- 🔍 **Filter Pets based on Type and Breed**
- ❤️ **Adopt a Pet**
- 🐕 **View a List of Pets Available for Adoption**
- 📝 **Create a User Account**
- 🔑 **Login to User Account**
- 👤 **View User Profile**
- ✏️ **Update User Profile**
- ❌ **Delete User Account**

## 🔍 Advanced Filtering Options

- 📛 **Name**: Search pets by their names.
- 🐾 **Species**: Filter out your preferred species (dogs, cats, etc.).
- 🧬 **Breed**: Looking for a specific breed? We've got you covered.
- 🎂 **Age**: Find pets by their age group.
- 📍 **Location**: Discover pets available in your local area or beyond.
- 📏 **Size**: Small, medium, large? Choose the size that fits your lifestyle.
- ⏫ **Sort by**: Arrange the pet list based on name, age, size, etc.
- 🔀 **Sort Order**: Prefer ascending or descending order? You choose.

## 📚 API Documentation

Our platform offers a comprehensive set of APIs that allow you to interact with the platform seamlessly. Here's a quick overview of the available endpoints:

- 🐾 **Pets API**

  - `GET /api/pets`: Get a list of all pets available for adoption.
  - `GET /api/pets/:id`: Get details of a specific pet.
  - `POST /api/pet`: Add a new pet for adoption.
  - `PUT /api/pets/:id`: Update details of a pet.

- 👤 **Users API**

  - `POST /api/register`: Create a new user account.
  - `POST /api/login`: Login to an existing user account.
  - `GET /api/profile`: Get user profile details.
  - `PUT /api/profile`: Update user profile details.

- ❤️ **Adoption API**
  - `POST /api/adoption-request`: Request for Adoption.
  - `GET /api/adoption-requests`: Get all adoption requests.
  - `PUT /api/adoption-requests/:id`: Update adoption request status.

## 🖋️ Authored by

- [🚀 Rakib](https://www.github.com/rakib8680) - Visionary behind this project. Find more about me on [GitHub](https://www.github.com/rakib8680)
