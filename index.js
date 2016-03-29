var alfredo = require('alfredo');
var Item = alfredo.Item;
var GoogleSpreadsheet = require("google-spreadsheet");
var _ = require('underscore');

var sheetId = process.argv[2];
var keyword = process.argv[3];

// spreadsheet key is the long id in the sheets URL
var sheet = new GoogleSpreadsheet(sheetId);

sheet.getRows(1, {}, function (err, rows) {
	if (err) throw err;

	var items = [];

	var matches = _.chain(rows)
		.filter(function (row) {
			return row.keyword.startsWith(keyword);
		})
		.each(function (row) {
			var item = new Item({
				arg: row.links,
				title: row.notes,
				subtitle: row.links,
				valid: true,
				autocomplete: row.keyword
			});

			items.push(item);
		})
		.value();

	alfredo.feedback(items);
});