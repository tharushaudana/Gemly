# 💎 Gemly – Fullstack E-commerce Website for Jewellery Shops

Gemly is a full-featured e-commerce platform designed specifically for jewellery shops. Built with modern web technologies, it offers a complete solution for managing product listings, customer interactions, admin control, and secure payments through PayHere.

---

## 🚀 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MySQL (with Prisma ORM)
- **Payment Integration:** PayHere
- **Recommendation Engine:** Personalized product recommendations using **TF-IDF**

---

## 📁 Folder Structure

```plaintext
Gemly/
├── front/
│   ├── client/        # Frontend (Client Side)
│   └── admin/         # Frontend (Admin Side)
├── back/              # Backend (Node.js + Express + Prisma)
├── gemly.sql          # Sample SQL file for testing
````

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

In all three directories: `/front/client`, `/front/admin`, and `/back`:

```bash
npm install
```

---

### 2️⃣ Backend Configuration

In `/back`, create a `.env` file by copying `.env.example` and update with your values:

```dotenv
# Database URL
DATABASE_URL="mysql://root@localhost:3306/gemly?schema=public"

# JWT Secret (generate from https://jwtsecret.com/generate)
JWT_SECRET="<your_jwt_secret_here>"

# PayHere Configuration
PAYHERE_MERCHANT_ID="<your_payhere_merchant_id>"
PAYHERE_SECRET="<your_payhere_secret>"
PAYHERE_NOTIFY_URL="https://<your_public_api_url>/payhere/notify"

# Server Port
PORT=3000
```

> 💡 You can use [ngrok](https://ngrok.com/) to expose your local API for testing PayHere notifications.

---

### 3️⃣ Prisma Setup

Inside `/back`:

```bash
npx prisma migrate dev
npx prisma generate
```

Add FULLTEXT index for search functionality:

```sql
ALTER TABLE `products` 
ADD FULLTEXT KEY `name` (`name`, `description`, `shortDescription`);
```

---

### 4️⃣ Import Sample Data (Optional)

For testing purposes, you can import the provided sample SQL file into your MySQL database:

```bash
mysql -u root -p gemly < gemly.sql
```

> Make sure the `gemly` database exists before importing.

---

### 5️⃣ Frontend Configuration

Inside `/front/client/src/utils/api.js`, set your API URL:

```js
const API_URL = 'http://localhost:3000';
```

---

## 🧪 Run the App

1. **Start the backend** (API):

```bash
cd back
node server
```

2. **Start the client frontend**:

```bash
cd front/client
npm run dev
```

3. *(Optionally)* start the admin frontend similarly:

```bash
cd front/admin
npm run dev
```

---

## 🔐 Features

* 🛍️ Product Listing
* 🔍 Search & Filters
* 👤 Customer Accounts
* 💳 Payment Integration with **PayHere**
* 🌟 Personalized Recommendations via **TF-IDF**
* 🛠 Admin Panel for Product Management

---

## 🎥 Demo Video

> *[📽 Watch Demo video here](demo/demo.mp4)*

---

## 👥 Team & Acknowledgments

This project was proudly built by our team for the **L1-S1 Web Technologies (IN1621)** module:

* Tharusha (me)
* Yasindu Aiya
* Pasindu
* Dehemi
* Kaveesha Akka

---

## 📜 License

MIT License

---

Thank you for visiting **Gemly**! 💎✨
