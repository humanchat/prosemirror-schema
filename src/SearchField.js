import Field from './Field';

export class SelectField extends Field {
  render() {
    let select = document.createElement('select');
    this.options.options.forEach(o => {
      let opt = select.appendChild(document.createElement('option'));
      opt.value = o.value;
      opt.selected = o.value === this.options.value;
      opt.label = o.label;
    });
    return select;
  }
}
