import express from "express";

export const componentRoutes = express.Router()

componentRoutes.post('/test', (req, res) => {
  console.log(req.baseUrl, req.originalUrl)
  res.send()
})
