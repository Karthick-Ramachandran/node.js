"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UploadsSchema extends Schema {
  up() {
    this.create("uploads", table => {
      table.increments();
      table.integer("user_id");
      table.string("asset");
      table.string("name");
      table.string("type");
      table.string("where");
      table.timestamps();
    });
  }

  down() {
    this.drop("uploads");
  }
}

module.exports = UploadsSchema;
