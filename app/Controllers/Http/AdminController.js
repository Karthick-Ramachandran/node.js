"use strict";
const Upload = use("App/Models/Upload");
const Helpers = use("Helpers");
class AdminController {
  async index({ view }) {
    return view.render("dashboard.index");
  }

  async upload({ view }) {
    return view.render("dashboard.upload");
  }
  async postupload({ request, response, session, auth }) {
    const input = request.all();
    const user_id = await auth.getUser();
    const image = request.file("asset");
    const uploadImage = await image;
    if (uploadImage._files) {
      for (var i = 0; i < uploadImage._files.length; i++) {
        const upload = await new Upload();
        upload.user_id = user_id.id;
        const date = Date.now();
        if (input.folder === "repo") {
          uploadImage.moveAll(Helpers.publicPath("repos"), {
            name: date + uploadImage._files[i].clientName,
            overwrite: true
          });
          upload.asset = "repos/" + date + uploadImage._files[i].clientName;
        } else {
          uploadImage.moveAll(Helpers.publicPath("wanted"), {
            name: date + uploadImage._files[i].clientName,
            overwrite: true
          });
          upload.asset = "wanted/" + date + uploadImage._files[i].clientName;
        }
        upload.where = input.folder;
        upload.type = uploadImage._files[i].type;
        upload.name = uploadImage._files[i].clientName;
        await upload.save();
        session.flash({ image: "File uploads are Successful" });
      }
    } else {
      const upload = await new Upload();
      upload.user_id = user_id.id;
      const date = Date.now();
      if (input.folder === "repo") {
        uploadImage.move(Helpers.publicPath("repos"), {
          name: date + uploadImage.clientName,
          overwrite: true
        });
        upload.asset = "repos/" + date + uploadImage.clientName;
      } else {
        uploadImage.move(Helpers.publicPath("wanted"), {
          name: date + uploadImage.clientName,
          overwrite: true
        });
        upload.asset = "wanted/" + date + uploadImage.clientName;
      }
      upload.where = input.folder;
      upload.type = uploadImage.type;
      upload.name = uploadImage.clientName;
      await upload.save();
      session.flash({ image: "File upload is Successful" });
    }
    return response.redirect("back");
  }

  async wanted({ view }) {
    const wanted = await Upload.query()
      .where("where", "wanted")
      .fetch();
    return view.render("dashboard.wanted", { wanted: wanted.toJSON() });
  }
}

module.exports = AdminController;
