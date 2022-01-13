# transactions-microservice

## Installation
To run this app locally use command `npm install` and open through http://localhost:4040
## Routes
<hr />

### Customer Routes
GET

    (Returns with all associations)
    "/customers" - Returns all customers
    "/customers/:username" - Returns single customer that matches username parameter

POST

    "/customers/create" - Creates customer 
    Provide in body object: 
        username: String,
        name: String

PATCH

    "/customers/patch" - Updates customer info
    Body object:
        id: Int,
        username: String (optional),
        name: String (Optional)

### Wallet Routes
POST

    "/wallets/create" - Creates wallet for user (only 1)
    Body:
        currencyType: String (Abbreviated i.e USD),
        currencyAmount: Integer (Initial value of wallet),
        CustomerId: Integer

### Transaction Routes

GET

    "/transactions" - Gets all transactions
    "/transactions/:id" - Returns specific transaction matched with transaction id parameter

POST

    "/transactions/create" - Creates a transaction
    Body Object:

    *For deposits:
        type: "deposit" (Must be lowercase string),
        amount: Integer,
        CustomerId, Integer

    *For Purchases of funds:
        type: "purchase" (Must be lowercase string),
        itemDescription: String,
        quantity: Integer,
        pricePerUnit: Integer,
        CustomerId: Integer

    *For selling of funds:
        type: "sell" (Must be lowercase string),
        id: Integer (Transaction id),
        quantity: Integer (Quantity to sell will fail if greater than available or if 0),
        CustomerId: Integer
## Models
### Customers

    username: String, unique,
    name: string

### Wallets

    currencyAmount: Integer,
    currencyType: String

### Transactions

    type: String
    itemDescription: String
    quantity: Float
    pricePerUnit: Float
    amount: Float
    sold: Boolean, default: false
    quantityAvailable: Integer