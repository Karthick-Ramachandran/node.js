"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ShouldLoggedIn {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth, session }, next) {
    // call next to advance the request
    try {
      const log = await auth.check();
      if (log) {
        await next();
      }
    } catch {
      session.flash({
        message: "You have to successfully pass first Login attempt to continue"
      });
      return response.redirect("/login");
    }
  }
}

module.exports = ShouldLoggedIn;
