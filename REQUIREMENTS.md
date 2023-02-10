# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
POST /products/add  - addNewProduct  [token required]
GET  /products/     - indexAllProducts 
GET  /products/:id  - ShowSpecificProduct 
PUT  /products/:id  - updateSpecificProduct 
DELETE /products/:id - deleteSpecificProduct 



#### Users
POST /users/add  - addNewUser  
GET  /users/     - indexAllUsers [token required]
GET  /users/:id  - ShowSpecificUser [token required]
PUT  /users/:id - updateSpecificUser [token required]
DELETE /users/:id - deleteSpecificUser [token required]

#### Orders
POST /orders/add  - addNewOrder  [token required]
GET  /orders/     - indexAllOrders [token required]
GET  /orders/:id  - ShowSpecificOrder [token required]
PUT  /orders/:id  - updateSpecificOrder [token required]
DELETE /orders/:id - deleteSpecificOrder [token required]

## Data Shapes
#### products
-  id_pk                    serial 
- name                      varchar(60) Not Null
- price                     Integer Not Null

#### users
- id_pk                     serial
- firstname                 varchar(60)   Not Null
- lastname                  varchar(60)   Not Null
- username                  varchar(50)   Not Null Unique
- password                  varchar(200)  Not Null

#### orders
**Note** we create here status_type as ENUM ('active' | 'complete') to use in this table :
- id_pk                     serial
- user_id_fk                integer 
- status                    status_type
#### purchase_list
- order_id_fk               integer Not null
- product_id_fk             integer Not Null
- productQuantity           integer Not Null

## Data Relationships
- user to order : one to many
- user to product : one to many
- product to order : dirctly it is **many to many** so we break down this relationship by create "purchase_list"  which represent **products of order** to be as following :
order to purchase_list: one to many
product to purchase_list:one to many



