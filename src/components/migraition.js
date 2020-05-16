exports.up = function (knex) {
  return knex.schema
    .createTable("rv", (tbl) => {
      tbl.increments();
      tbl.string("username", 255).notNullable().unique();
      tbl.string("email", 255).unique();
      tbl.string("contact", 255);
      tbl.string("password", 255).notNullable();
    })

    .createTable("landowner", (tbl) => {
      tbl.increments();
      tbl.string("username", 255).notNullable().unique();
      tbl.string("email", 255).unique();
      tbl.string("contact", 255);
      tbl.string("password", 255).notNullable();
    })
    .createTable("listing", (tbl) => {
      tbl.increments().onUpdate("CASCADE").onDelete("CASCADE");
      tbl.text("description", 255).notNullable();
      tbl.string("price", 255).notNullable();
      tbl.string("location", 255).notNullable();
      tbl.string("photo", 255);
      tbl.string("amenities", 255);
      tbl
        .integer("landowner_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("landowner")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("reservation", (tbl) => {
      tbl.increments();
      tbl
        .integer("rvowner_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("rv")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("listing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("listing")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("date", 255).notNullable();
    })
    .createTable("landowner_listing", (tbl) => {
      tbl
        .integer("landowner_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("landowner")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("listing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("listing")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["landowner_id", "listing_id"]);
    })
    .createTable("rvownerfav_listing", (tbl) => {
      tbl
        .integer("rvowner_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("rv")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("listing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("listing")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["rvowner_id", "listing_id"]);
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("rvownerfav_listing")
    .dropTableIfExists("landowner_listing")
    .dropTableIfExists("reservation")
    .dropTableIfExists("listing")
    .dropTableIfExists("landowner")
    .dropTableIfExists("rv");
};
