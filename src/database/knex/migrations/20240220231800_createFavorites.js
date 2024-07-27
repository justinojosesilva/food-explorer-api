exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments("id")
  table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE")
  table.integer("product_id").notNullable().references("id").inTable("products").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now());
});


exports.down =  knex => knex.schema.createTable("favorites");