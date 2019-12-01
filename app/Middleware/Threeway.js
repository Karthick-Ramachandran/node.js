"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Threeway {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ session, response, auth }, next) {
    try {
      const user = await auth.getUser();
      if (user.secondlogin && user.thirdlogin) {
        await next();
      }
    } catch {
      session.flash({ message: "Login here" });
      return response.redirect("/login");
    }
  }
}

module.exports = Threeway;
