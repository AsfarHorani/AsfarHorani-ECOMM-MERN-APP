
# Mr Food

A brief description of what this project does and who it's for
An ecommerce food store built with MERN stack, and utilizes third party API's. This ecommerce store enable three main different flows or implementations:

Customers can browse through different kinds of foods like desi, fast foods and continentals etc,
And then customers can order it easily using their information.
The developement information is given below:
Node provides the backend environment for this application
Express middleware is used to handle requests, routes.
Mongoose schemas to model the application data.
React for displaying UI components.



## Demo

Here's the wbsite link you can explore here and also try to do a demo order: 
https://asfii-foods-mern-app.web.app/#/


## Screenshots




## Installation

Some basic Git commands are:

$ git clone https://github.com/mohamedsamara/mern-ecommerce.git
$ cd project
$ npm install
## Languages and main tools
Node js -> Express js
MongoDB
React js

## Other
Jws tokens
multer
mongoose
bcrypt
nodemailer
uuid

and a few more...=
## API Reference

#### Get all items

```http
https://mrfood-mernapp.herokuapp.com/get-products
```

| body input | Type     | Description                |
| :-------- | :------- | :------------------------- |
null

 returns all the products

```http
https://mrfood-mernapp.herokuapp.com/signup
```

signup to be an admin

| body input | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `email` | **Required**. email of user must be unique |
| `name` | `string` | optional |
| `password`| `string`| **required**

```http
https://mrfood-mernapp.herokuapp.com/login
```

login as admin

| body input | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `email` | **Required**. email of user must be unique |
| `password`| `string`| **required**



```http
https://mrfood-mernapp.herokuapp.com/product/[productID]/
```

| body input | Type     | Description                |
| :-------- | :------- | :------------------------- |
null

will return the product

ALL THE API's BELOW FOR ADMINS ONLY AND WILL REQUIRED AUTHENTICATION

```http
https://mrfood-mernapp.herokuapp.com/add-product
```

| Body input | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` |  |
| `price`| `string`| **required**
|`Description`| `string` | 
|`image`| `jpg pr png file` |

```http
https://mrfood-mernapp.herokuapp.com/product/delete-product/[prodID]
```

| body input | Type     | Description                |
| :-------- | :------- | :------------------------- |
null
 will delete product

```http
https://mrfood-mernapp.herokuapp.com/product/edit-product/[prodID]
```

| body input | Type     | Description                |
| `title` | `string` | :------------------------- |
| `price` | `number` | :------------------------- |
| `Description` | `string` | :------------------------- |
| `imageUrl` | `string` | :------------------------- |

 will edit product



```http
https://mrfood-mernapp.herokuapp.com/product/get-orders/
```

| body input | Type     | Description                |
| :-------- | :------- | :------------------------- |
null
 will give you all the orders but also required you to be authorized admin

```http
https://mrfood-mernapp.herokuapp.com/delete-order/[order-id]/
```

| body input | Type     | Description                |
| :-------- | :------- | :------------------------- |
null
 will delete an order 
