export class Scale {
  constructor(in_scale) {
    this.in_scale = in_scale;
    this._allScales = ['C', 'Cs', 'D', 'Ef', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'Bf', 'B']
  // this._allScales = ['0',  '1', '2',  '3', '4', '5', '6',  '7', '8',  '9', '10', '11']
  }

  _calcScaleOffset(in_scale) {
    let offset;
    this._allScales.forEach((item, index)=>{
      if(item === in_scale) {
        offset = index;
      }
    });
    return offset;
  }

  getMajor() {
    const majorFormula = [0, 2, 4, 5, 7, 9, 11];
    return majorFormula.map(item => {
      const offsetIndex = (item + this._calcScaleOffset(this.in_scale))%12;
      return this._allScales[offsetIndex];
      
    })
  }
  getMinorNatural() {
    const minorNaturalFormula = [0, 2, 3, 5, 7, 8, 10];
    return minorNaturalFormula.map(item => {
      const offsetIndex = (item + this._calcScaleOffset(this.in_scale))%12;
      return this._allScales[offsetIndex];
    })
  }
}