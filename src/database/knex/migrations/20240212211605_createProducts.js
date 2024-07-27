exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id")
  table.text("name").notNullable()
  table.text("description")
  table.text("image")
  table.decimal("price", 10,2).default(0)
  table.integer("category_id").notNullable().references("id").inTable("categories").onDelete("CASCADE")
  table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products");
