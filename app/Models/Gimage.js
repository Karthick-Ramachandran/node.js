"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Gimage extends Model {
  gait() {
    return this.belongsTo("App/Models/Gait");
  }
}

module.exports = Gimage;
