const express = require("express");
const nunjucks = require("nunjucks");
const videos = require("./data");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const about = {
    avatar_url:
      "https://avatars1.githubusercontent.com/u/23039289?s=460&u=55a454c13bdfb87ac146e6946bb2f6c9a5b2bee1&v=4",
    name: "Philipe Perete",
    role: "Aluno - Rocketseat",
    description:
      'Aprendendo a programar full-stack, focado em aprender programação. Aluno da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>.',
    links: [
      {
        name: "Github",
        url: "https://github.com/philipeperete",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/PhilipePerete",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/philipe-perete-b76622104/",
      },
    ],
  };

  return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;

  const video = videos.find(function (video) {
    return video.id == id;
  });

  if (!video) {
    return res.send("Video not found.");
  }

  return res.render("video", { item: video });
});

server.listen(5000, function () {
  console.log("Servidor está rodando.");
});
