import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'chords-switch',
  templateUrl: './chords-switch.component.html',
  styleUrls: ['./chords-switch.component.css']
})
export class ChordsSwitchComponent implements OnInit {

  @Output() chordsSwitched = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
