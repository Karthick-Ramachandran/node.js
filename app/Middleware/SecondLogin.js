"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class SecondLogin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    try {
      const user = await auth.getUser();
      if (user.secondlogin === 0) {
        await next();
      } else if (user.thirdlogin === 0) {
        return response.redirect("/third-login");
      }
    } catch {
      return response.redirect("back");
    }
  }
}

module.exports = SecondLogin;
