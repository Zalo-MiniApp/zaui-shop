const hexToRgb = (hex, opacity = undefined) => {
  if (!hex) return undefined;
  var h = hex.replace("#", "");
  h = h.match(new RegExp("(.{" + h.length / 3 + "})", "g"));

  for (var i = 0; i < h.length; i++)
    h[i] = parseInt(h[i].length == 1 ? h[i] + h[i] : h[i], 16);

  if (typeof opacity != "undefined") h.push(opacity);

  return h.join(", ");
};

export default hexToRgb;
