# Phoenix Bank API

A Node.js and Express-based digital banking API that simulates core banking operations using the NIBSS by Phoenix sandbox. 
The application supports customer onboarding, authentication, account creation, balance enquiry, fund transfers, and transaction history while enforcing customer data privacy.

---

## Features

### Customer Onboarding

* Customer registration
* BVN validation
* Customer onboarding
* Secure password hashing with bcrypt
* Customer account creation through NIBSS by Phoenix

### Authentication & Authorization

* Customer login
* JWT token generation
* Protected routes using authentication middleware
* Secure password comparison during login

### Core Banking Operations

* Balance enquiry
* Name enquiry
* Fund transfers
* Transaction logging
* Transaction history retrieval
* Single transaction lookup

### Data Privacy

* Customers can only access their own transaction records
* Protected endpoints require valid authentication tokens
* Passwords are never exposed in API responses

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt
* Axios
* NIBSS by Phoenix API

---

# Installation

## Clone Repository

```bash
git clone https://github.com/thegatekeepa/phoenixbank
cd phoenix-bank
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NIBSS_BASE_URL=https://nibssbyphoenix.onrender.com

PHO_TOKEN=your_fintech_token
```

---

# Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# Authentication Flow

### Register

Customer submits:

* First Name
* Last Name
* Email
* Phone Number
* Password
* BVN
* Date of Birth

The system:

1. Validates BVN
2. Creates customer record
3. Creates NIBSS account
4. Stores customer and account details

---

### Login

Customer provides:

```json
{
  "email": "customer@email.com",
  "password": "password123"
}
```

Response:

```json
{
  "message": "Login successful",
  "id": "customerId",
  "firstName": "John",
  "lastName": "Doe",
  "token": "jwt-token"
}
```

---

# Protected Routes

All protected routes require:

```http
Authorization: Bearer <jwt-token>
```

---

# API Endpoints

## Customer Registration

### POST

```http
/api/account/register
```

Request:

```json
{
  "firstName": "Abbey",
  "lastName": "Zachs",
  "email": "abbey@email.com",
  "password": "Password123",
  "bvn": "55571093427",
  "dob": "1980-02-13"
}
```

---

## Customer Login

### POST

```http
/api/account/login
```

Request:

```json
{
  "email": "abbey@email.com",
  "password": "Password123"
}
```

---

## Account Balance

### GET

```http
/api/account/balance
```

Response:

```json
{
  "accountName": "Abbey Zachs",
  "accountNumber": "6565564649",
  "balance": 10000
}
```

---

## Fund Transfer

### POST

```http
/api/account/funds/transfer
```

Request:

```json
{
  "recipientAccountNumber": "6567794264",
  "amount": 5000,
  "narration": "School Fees"
}
```

Response:

```json
{
  "message": "Transfer successful",
  "transferReceipt": {
    "reference": "TX1782339089770",
    "senderAccount": "6565564649",
    "senderName": "John Doe",
    "receiverAccount": "6567794264",
    "receiverName": "Mary Jane",
    "amount": 5000,
    "narration": "School Fees",
    "status": "SUCCESS"
  }
}
```

---

## Transaction History

### GET

```http
/api/account/view/transactions
```

Returns all transactions initiated by the authenticated customer.

---

## View Single Transaction

### GET

```http
/api/account/view/transaction/:reference
```

Example:

```http
/api/account/view/transaction/TX1782339089770
```

Returns a specific transaction belonging to the authenticated customer.

---

# Security Measures

## Password Hashing

Passwords are hashed using bcrypt before being stored.

```javascript
bcrypt.hash(password, saltRounds)
```

---

## JWT Authentication

JWT tokens are generated during login and verified using middleware.

```javascript
jwt.verify(token, process.env.JWT_SECRET)
```

---

## Route Protection

Protected routes use authentication middleware.

```javascript
router.get("/balance", protect, getAcctBalance);
```

---

## Data Isolation

Transaction queries are filtered by:

```javascript
initiatedBy: req.user.id
```

This makes sure customers cannot access another customer's transaction records.

---

# Testing

All testing was performed using Postman.

Verified functionalities:

* Customer Registration
* Customer Login
* Account Creation
* Balance Enquiry
* Name Enquiry
* Fund Transfer
* Transaction Logging
* Transaction History
* Transaction Privacy Enforcement

---

# Limitation Disclaimer

Account balances are kept by the NIBSS by Phoenix API.

The application retrieves balance information directly from the sandbox API instead of maintaining a database storage of it. 
So, NIBSS remains the source of truth for account balances.

---

# Author

David Caleb (theGatekeepa)

Backend Developer (Node.js, Express, MongoDB)
