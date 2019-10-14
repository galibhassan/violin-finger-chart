import "./style.css";
import {FingerBoard} from './fingerBoard';

let in_scale = 'G';
let in_scaleMode = 'Major';
let myFingerBoard = new FingerBoard(in_scale, in_scaleMode);

// eventListeners ---------------
const scaleFromUser = document.getElementById('scaleFromUser');
const scaleModeFromUser = document.getElementById('scaleModeFromUser');

// Default
scaleFromUser.value = 'G';
scaleModeFromUser.value = 'Major';

scaleFromUser.addEventListener('change', function(e){
  in_scale = e.currentTarget.value;
  let myFingerBoard = new FingerBoard(in_scale, in_scaleMode);
})
scaleModeFromUser.addEventListener('change', function(e){
  in_scaleMode = e.currentTarget.value;
  let myFingerBoard = new FingerBoard(in_scale, in_scaleMode);
})
