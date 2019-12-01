"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GimageSchema extends Schema {
  up() {
    this.create("gimages", table => {
      table.increments();
      table.integer("gait_id");
      table.string("image");
      table.timestamps();
    });
  }

  down() {
    this.drop("gimages");
  }
}

module.exports = GimageSchema;
