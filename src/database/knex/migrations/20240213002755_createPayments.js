exports.up = knex => knex.schema.createTable("payments", table => {
  table.increments("id")
  table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE")
  table.integer("order_id").notNullable().references("id").inTable("orders").onDelete("CASCADE")
  table
  .enum("type_payment", ["pix","credit"], { useNative: true, enumName: 'type_payment'})
  .notNullable().default("pix")
  table
  .enum("status", ["waiting","approved"], { useNative: true, enumName: 'status'})
  .notNullable().default("waiting")
  table.text("pix_code")
  table.integer("number_credit")
  table.integer("cvc_credit")
  table.date("validate_credit")
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down =  knex => knex.schema.createTable("payments");

