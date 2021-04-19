import Polyglot from 'node-polyglot';

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

export function extendLocale(phrases) {
  polyglot.extend(phrases);
}
