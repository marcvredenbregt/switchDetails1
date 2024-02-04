import { Request, Response, NextFunction } from 'express';
import { ProcessData } from './processData';
import * as fs from 'fs';

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/")));
// app.use(express.static('public'))

app.post('/switch-details', (req: Request, res: Response) => {
  var file = fs.readFileSync('/Applications/XAMPP/xamppfiles/htdocs/switchDetails/data/switch-transciever-details.txt', 'utf8')
  // console.log(file);
  res.send(new ProcessData().parse(file))
})
app.listen(10000, function () {
  console.log("Started application on port %d", 10000);
});
