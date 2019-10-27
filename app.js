"use strict";

const cmd = require("node-cmd");
const axios = require("axios");
const tokenJson = require("./token");
const token = tokenJson.token;
const server = tokenJson.server;
const gituser = tokenJson.user;

const options = {
  headers: { "PRIVATE-TOKEN": token }
};
getProjects(1);

function getProjects(page) {
  axios
    .get(
      `https://${server}/api/v4/users/${gituser}/projects?per_page=100&page=${page}`,
      options
    )
    .then(function(response) {
      const urls = response.data;
      var i = 0;
      for (let u of urls) {
        //console.log(u);

        var p = u.http_url_to_repo;
        var v = u.visibility; // private / public

        var re = new RegExp(`https://(.*)/(.*)/(.*).git`);
        var r = p.match(re);
        var url = r[1];
        var user = r[2];
        var repo = r[3];

        console.log(`https://${url}/${user}/${repo}.git`);

        cmd.run(
          `git clone https://${url}:${token}@${url}/${user}/${repo}.git backup/${user}/${v}/${repo};`
        );
        i++;
      }
      return i;
    })

    .then(function(response) {
      if (response > 0) {
        getProjects(page + 1);
      }
    })

    .catch(function(error) {
      console.log(error);
    });

  /*.finally(function() {
      console.log("Backup done!");
    });*/
}
