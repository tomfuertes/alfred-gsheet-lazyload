var alfredo = require('alfredo');
var Item = alfredo.Item;
var GoogleSpreadsheet = require("google-spreadsheet");
var lodash = require('lodash');

// var sheetId = "1JHtId-vYNVT9q6U8QErd4ksXxhTkc3ua2snWfUiOmmQ";
var sheetId = process.argv[2];
var shorthand = process.argv[2];

var fs = require('fs');

var cacheFileName = './data/gsheet-cache.json';
var cachedDataRows = require(cacheFileName);

// spreadsheet key is the long id in the sheets URL
var sheet = new GoogleSpreadsheet(sheetId);

sheet.getRows(1, {}, function(err, rows) { // x = rows});
  if (err) throw err;

  var toCache = [];

  lodash.chain(rows).filter(function(row) {
    return true; // row.shorthand.startsWith(shorthand);
  }).each(function(row) {
    var item = {
      links: row.links,
      notes: row.notes,
      shorthand: row.shorthand
    };
    toCache.push(item);
  }).value();

  fs.writeFile(cacheFileName, JSON.stringify(toCache, null, 2), function(err) {
    if (err) {
      console.error(err);
      throw new Error(err);
    }
  });

});

var items = [];

lodash.chain(cachedDataRows).filter(function(row) {
  return row.shorthand.startsWith(shorthand);
}).each(function(row) {
  var item = new Item({
    arg: row.links,
    title: row.notes,
    subtitle: row.links,
    valid: true,
    autocomplete: row.shorthand
  });
  items.push(item);
}).value();

alfredo.feedback(items);
