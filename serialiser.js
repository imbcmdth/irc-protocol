var stream = require("stream"),
    util = require('util');

module.exports = Serialiser;

function Serialiser(options) {
  options = options || {};
  options.objectMode = true;

  stream.Transform.call(this, options);
}

util.inherits(Serialiser, stream.Transform);

Serialiser.prototype._transform = function _transform(input, encoding, done) {
  this.push(this.format_message(input) + "\r\n");

  return done();
};

Serialiser.prototype.format_message = function format_message(message) {
  return [(message.prefix ? ":" + this.format_prefix(message.prefix) + " " : ""), this.format_parameters([message.command].concat(message.parameters || []))].join("");
};

Serialiser.prototype.format_prefix = function format_prefix(prefix) {
  if (prefix.nick && (prefix.user || prefix.server)) {
    return prefix.nick + (prefix.user ? "!" + prefix.user : "") + (prefix.server ? "@" + prefix.server : "");
  } else if (prefix.nick) {
    return prefix.nick;
  } else if (prefix.server) {
    return prefix.server;
  }
};

Serialiser.prototype.format_parameters = function format_parameters(parameters) {
  parameters = parameters.slice()
  var last_param = parameters[parameters.length-1]
  if (last_param.match(/\s/) || last_param.match(/^:/) || last_param === "") {
    parameters[parameters.length-1] = ":" + last_param
  }
  return parameters.join(' ')
};
