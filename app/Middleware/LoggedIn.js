"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class LoggedIn {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    // call next to advance the request
    try {
      const log = await auth.check();
      if (log) return response.redirect("/dashboard/admin");
    } catch {
      await next();
    }
  }
}

module.exports = LoggedIn;
