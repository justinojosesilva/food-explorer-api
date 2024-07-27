exports.up = knex => knex.schema.createTable("order_products", table => {
  table.increments("id")
  table.integer("quantity").notNullable()
  table.decimal("unit_price", 10,2).default(0)
  table.integer("order_id").notNullable().references("id").inTable("orders").onDelete("CASCADE")
  table.integer("product_id").notNullable().references("id").inTable("products").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now());
});


exports.down =  knex => knex.schema.createTable("order_products");
