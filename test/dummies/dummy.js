export default class Dummy {
  static TRAITS = {}

  attrs(...attrs) {
    return attrs.reduce((obj, attr) => ({ ...obj, [attr]: this[attr] }), {});
  }

  processTraits(obj = {}) {
    const traits = Object.keys(obj).filter((t) => Object.keys(this.constructor.TRAITS).indexOf(t) >= 0);

    traits.forEach((trait) => { this.constructor.TRAITS[trait].call(this, obj[trait]); });
  }
}
