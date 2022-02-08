import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import fetch from "node-fetch";
import "babel-core/register";
import "babel-polyfill";
import config from "../../src/config.json";

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use("/facets", facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    res.json({ version });
  });

  api.get("/listBlocks", async (req, res) => {
    try {
      const api_url = `${config.server}` + "/blocks/1573858800000?format=json";
      const fetch_response = await fetch(api_url);
      const jsonData = await fetch_response.json();
      res.json(jsonData);
    } catch (e) {
      console.log("error in list blocks", e);
      res.send(e);
    }
  });

  api.get("/blockDetails/:blockId", async (req, res) => {
    try {
      const blockId = req.params.blockId;
      const api_url = `${config.server}` + "/rawblock/" + blockId.toString();
      console.log("api_url", api_url);
      const fetch_response = await fetch(api_url);
      const jsonData = await fetch_response.json();
      res.json({
        hash: req.params.blockId,
        size: jsonData.size,
        prev_block: jsonData.prev_block,
        block_index: jsonData.block_index,
      });
    } catch (e) {
      console.log("error in block details:", e);
      res.send(e);
    }
  });

  return api;
};
