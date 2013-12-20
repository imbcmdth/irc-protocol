exports.Parser = require("./parser");
exports.Serialiser = require("./serialiser");

var numerics = require("./numerics");

function numericToName(number) {
	return numerics[''+number];
}

var names = Object.keys(numerics).reduce(function (obj, key) {
	obj[numerics[key]] = key;

	return obj;
}, {});

function nameToNumeric(name) {
	return names[name];
}

exports.Numerics = {
	toName: numericToName,
	fromName: nameToNumeric
};
