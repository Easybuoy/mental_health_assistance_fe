import Polyglot from 'node-polyglot';
import DOM from 'react-dom-factories';

const polyglot = new Polyglot();

export function getLocale() {
  return polyglot;
}
export function tl8(ref, opts = null) {
  if (!polyglot) {
    return '';
  }

  return polyglot.t(ref, opts);
}

export function tl8Has(ref) {
  return getLocale().has(ref);
}

export function tl8Html(ref, opts = null, el = 'span') {
  if (!polyglot) {
    return null;
  }

  if (!el || typeof el !== 'string' || !DOM[el]) {
    console.warn(`el must be of type string, but el was of type ${typeof el}`);
    return null;
  }

  return DOM[el]({
    dangerouslySetInnerHTML: {
      __html: polyglot.t(ref, opts),
    },
    className: 'translation',
  });
}

export function extendLocale(phrases) {
  polyglot.extend(phrases);
}
