import feather from 'feather-icons';

export default function IconHtml(glyph, options = {}) {
  return { __html: feather.icons[glyph].toSvg(options) };
}
