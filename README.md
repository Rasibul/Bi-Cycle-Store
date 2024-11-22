# 🚴 Bicycle Store Backend

Welcome to the backend application for managing a bicycle store! This project is built with **Node.js**, **Express.js**, and **Mongoose**, featuring **TypeScript** for type safety and **ESLint with Prettier** for code quality and formatting.

---

## 🌟 Features

- **Product Management**: Add, update, delete, and retrieve bicycle products.
- **Order Handling**: create an order and show revenue for the total order price.
- **Database Integration**: Utilizes MongoDB-mongoose for efficient data storage.
- **Type Safety**: Developed with TypeScript for  maintainable code.
- **Code Quality**: Configured with ESLint and Prettier for clean and consistent code.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **Mongoose (MongoDB)**
- **TypeScript**
- **ESLint**
- **Prettier**

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/) 
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rasibul/Bi-Cycle-Store.git
cd bicycle-store-backend

```

### 2️⃣ Install Dependencies  

Install the required dependencies using npm or yarn:  

```bash
npm install  
# or  
yarn install

```
### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
DATABASE_URL=mongodb+srv://admin:C58KT42BSBy1F96C@cluster0.xmelfag.mongodb.net/bi-cycle-store?retryWrites=true&w=majority&appName=Cluster0

```
### 4️⃣ Run the Application

Start the development server:

```bash
npm run start:dev
# or
yarn run start:dev
```


The application will run locally at
```bash
http://localhost:5000
```



## 📜 Available Scripts
- **npm run start: dev**: Start the development server with live reload.
- **npm run build**: Compile the TypeScript code for production.
- **npm start**: Run the compiled production build.
- **npm run lint**: Check code quality with ESLint.
- **npm run prettier**: Format code using Prettier.




