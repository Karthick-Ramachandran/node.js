"use strict";
const Smart = use("App/Models/Smart");
class AlertController {
  async image({ view }) {
    const repo = await Smart.query()
      .where("type", "image")
      .fetch();
    return view.render("dashboard.alert.image", { repo: repo.toJSON() });
  }
  async video({ view }) {
    const repo = await Smart.query()
      .where("type", "video")
      .fetch();
    return view.render("dashboard.alert.video", { repo: repo.toJSON() });
  }
}

module.exports = AlertController;
