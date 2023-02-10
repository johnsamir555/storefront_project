-- Create the table "purchase_list"
CREATE TABLE IF NOT EXISTS purchase_list (
  order_id   INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_quantity   INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE 
);