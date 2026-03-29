/**
 * BuzzCenter logo SVG generator — shared between generate-icons.js and Logo.js.
 *
 * Star icon matching the BuzzMark in Logo.js.
 * SVG's viewBox attribute handles scaling to any output size automatically.
 *
 * Pure CommonJS — safe to require() in Node.js scripts.
 */

function getReelMarkSvg(size, bgColor) {
  var s = size || 38
  return (
    '<svg width="' +
    s +
    '" height="' +
    s +
    '" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">\n' +
    '  <defs><linearGradient id="buzzGrad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">' +
    '<stop offset="0%" stop-color="#EF4444"/><stop offset="100%" stop-color="#B91C1C"/>' +
    "</linearGradient></defs>\n" +
    '  <rect width="38" height="38" rx="10" fill="url(#buzzGrad)"/>\n' +
    '  <path d="M19 7 L21.5 15 L30 15 L23.5 20 L25.5 28 L19 23.5 L12.5 28 L14.5 20 L8 15 L16.5 15 Z" fill="white" opacity="0.95"/>\n' +
    "</svg>"
  )
}

// Keep backward-compatible names
function getMountainMarkSvg(size, bgColor) {
  return getReelMarkSvg(size, bgColor)
}

function generateLogoSvg(opts) {
  var o = opts || {}
  return getReelMarkSvg(o.size || 100, o.bgColor)
}

module.exports = {
  getMountainMarkSvg: getMountainMarkSvg,
  getReelMarkSvg: getReelMarkSvg,
  generateLogoSvg: generateLogoSvg,
}
