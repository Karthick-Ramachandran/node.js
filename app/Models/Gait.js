"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Gait extends Model {
  gimages() {
    return this.hasMany("App/Models/Gimage");
  }
}

module.exports = Gait;
