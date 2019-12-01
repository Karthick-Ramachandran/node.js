"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SmartSchema extends Schema {
  up() {
    this.create("smarts", table => {
      table.increments();
      table.integer("user_id");
      table.string("asset");
      table.string("name");
      table.string("type");
      table.timestamps();
    });
  }

  down() {
    this.drop("smarts");
  }
}

module.exports = SmartSchema;
