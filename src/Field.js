export class Field {
  constructor(options) {
    this.options = options;
  }
  read(dom) {
    return dom.value;
  }

  validateType() {}

  validate(value) {
    if (!value && this.options.required) return 'Required field';
    return (
      this.validateType(value) ||
      (this.options.validate && this.options.validate(value))
    );
  }

  clean(value) {
    return this.options.clean ? this.options.clean(value) : value;
  }
}
