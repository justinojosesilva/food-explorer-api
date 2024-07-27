exports.up = knex => knex.schema.createTable("product_items", table => {
  table.increments("id")
  table.text("name").notNullable()
  table.integer("product_id").notNullable().references("id").inTable("products").onDelete("CASCADE")
  table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("product_items");
