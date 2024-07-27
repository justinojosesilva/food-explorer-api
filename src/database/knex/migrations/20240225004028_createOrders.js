exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id")
  table.decimal("amount", 10,2).default(0)
  table
  .enum("status", ["pending","preparing","delivered"], { useNative: true, enumName: 'status'})
  .notNullable().default("pending")
  table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down =  knex => knex.schema.createTable("orders");