import { Scale } from './scale'

export class FingerBoard {
  constructor(in_scale, in_scaleMode) {
    this.in_scale = in_scale;
    this.in_scaleMode = in_scaleMode

    this._scale = new Scale(this.in_scale);

    switch (in_scaleMode) {
      case 'Major':
        this._scaleNotes = this._scale.getMajor();
        break;
      case 'MinorNatural':
        this._scaleNotes = this._scale.getMinorNatural();
        break;
    }

    this._createCanvas();

    //test
    //console.log(this.getNotePositions());
  }

  getNotePositions() {
    const firstStringNotesPossibilities = ['G', 'Gs', 'A', 'Bf', 'B', 'C', 'Cs'];
    const secondStringNotesPossibilities = ['D', 'Ef', 'E', 'F', 'Fs', 'G', 'Gs'];
    const thirdStringNotesPossibilities = ['A', 'Bf', 'B', 'C', 'Cs', 'D', 'Ef'];
    const fourthStringNotesPossibilities = ['E', 'F', 'Fs', 'G', 'Gs', 'A', 'Bf'];

    return {
      scale: {
        key: this.in_scale,
        mode: this.in_scaleMode
      },
      notes: {
        string1: this._getStringNotesForCurrentScale(firstStringNotesPossibilities),
        string2: this._getStringNotesForCurrentScale(secondStringNotesPossibilities),
        string3: this._getStringNotesForCurrentScale(thirdStringNotesPossibilities),
        string4: this._getStringNotesForCurrentScale(fourthStringNotesPossibilities),
      }
    }
  }

  _getStringNotesForCurrentScale(stringNotes) {
    let stringOccupancy = [];

    for (let i = 0; i < stringNotes.length; i++) {
      for (let j = 0; j < this._scaleNotes.length; j++) {
        if (stringNotes[i] === this._scaleNotes[j]) {
          stringOccupancy.push(i)
        }
      }
    }
    return stringOccupancy;
  }


  _createCanvas() {

    this._canvas = document.getElementById('canvas_FingerBoard');
    this._canvas.width = 500;
    this._canvas.height = 500;
    const ctx = this._canvas.getContext('2d');
    const startX = 100;
    const startY = 100;
    const hSpacing = 40;
    const vSpacing = 50

    this._drawLine(startX, startY, 100, 400, ctx)
    this._drawLine(startX + hSpacing, startY, startX + hSpacing, 400, ctx)
    this._drawLine(startX + 2 * hSpacing, startY, startX + 2 * hSpacing, 400, ctx)
    this._drawLine(startX + 3 * hSpacing, startY, startX + 3 * hSpacing, 400, ctx)
    this._drawLine(startX, startY, startX + 3 * hSpacing, startY, ctx);

    const { fingerboardAllPositions, fingerboardAllPositionsShadow } = this._markFingerBoardAllPossibilities(startX, startY, hSpacing, vSpacing, ctx);
    const currentScaleNotes = this.getNotePositions().notes;

    (Object.keys(currentScaleNotes)).forEach(string => {
      currentScaleNotes[string].forEach((item, index) => {
        // mark this item to fingerboardAllPositionsShadow array
        switch (string) {
          case 'string1':
            fingerboardAllPositionsShadow[0][item] = 1;
            break;
          case 'string2':
            fingerboardAllPositionsShadow[1][item] = 1;
            break;
          case 'string3':
            fingerboardAllPositionsShadow[2][item] = 1;
            break;
          case 'string4':
            fingerboardAllPositionsShadow[3][item] = 1;
            break;
        }
      })
    });

    for (let i = 0; i < fingerboardAllPositionsShadow.length; i++) {
      for (let j = 0; j < fingerboardAllPositionsShadow[i].length; j++) {
        if (fingerboardAllPositionsShadow[i][j] === 1) {
          this._drawDot(
            fingerboardAllPositions[i][j][0],
            fingerboardAllPositions[i][j][1],
            10,
            ctx

          )
        }
      }
    }


    fingerboardAllPositionsShadow[0].forEach((isOccupied, index) => {
      if (isOccupied === 1) {
        console.log('draw circle on: ', index)
      }
    })
  }

  _drawLine(x1, y1, x2, y2, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  _drawDot(centerX, centerY, radius, ctx) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillstyle = 'orange'
    ctx.fill()
  }

  _markFingerBoardAllPossibilities(x_initial, y_initial, hSpacing, vSpacing, ctx) {
    const x = x_initial;
    const y = y_initial;
    let fingerboardAllPositions = [];
    let fingerboardAllPositionsShadow = [];
    const noteCount = 7;
    const stringCount = 4;

    for (let i = 0; i < stringCount; i++) {
      let currentStringAllPositions = []
      let currentStringAllPositionsShadow = []

      for (let j = 0; j < noteCount; j++) {
        currentStringAllPositions.push([x + i * hSpacing, y + j * vSpacing])
        currentStringAllPositionsShadow.push(0)
      }
      fingerboardAllPositions.push(currentStringAllPositions)
      fingerboardAllPositionsShadow.push(currentStringAllPositionsShadow)
    }

    for (let i = 0; i < stringCount; i++) {
      for (let j = 0; j < noteCount; j++) {
        let centerX = fingerboardAllPositions[i][j][0];
        let centerY = fingerboardAllPositions[i][j][1];
        let radius = 2;
        this._drawDot(centerX, centerY, radius, ctx)
      }
    }


    console.log(fingerboardAllPositions)

    return {
      fingerboardAllPositions,
      fingerboardAllPositionsShadow,
    };

  }
}
