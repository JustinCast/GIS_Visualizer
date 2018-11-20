import { Injectable } from '@angular/core';
import { Layer } from '../models/layer';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  actualSession(layer: Layer) {
    localStorage.setItem('layer', JSON.stringify(layer));
  }

  getActualSession(): Layer {
    return JSON.parse(localStorage.getItem('layer'));
  }
}
