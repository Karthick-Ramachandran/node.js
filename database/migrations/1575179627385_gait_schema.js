"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GaitSchema extends Schema {
  up() {
    this.create("gaits", table => {
      table.increments();
      table.string("video_url");
      table.timestamps();
    });
  }

  down() {
    this.drop("gaits");
  }
}

module.exports = GaitSchema;
