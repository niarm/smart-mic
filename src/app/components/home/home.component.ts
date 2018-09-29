import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ElectronService} from '../../providers/electron.service';
import {ArduinoService} from '../../providers/arduino.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('camera') video;
  @ViewChild('myCanvas') canvas;
  private ctx;

  subtitle = '';
  public stepsToMoveInputValue = 50;

  constructor (private electronService: ElectronService,
               public arduinoService: ArduinoService) {
    // this.subtitle = `app works on ${this.electronService.os.platform()} with electron ${this.electronService.electron.remote.process.versions.electron}!`;

  }

  ngOnInit () {
  }

  ngAfterViewInit() {
    const _video = this.video.nativeElement;

    navigator.getUserMedia({video: true, audio: false},
      (stream) => {
        _video.srcObject = stream;
      },
      (error) => {
        console.log('Error' + error);
      }
    );
  }

  public onPythonMessageClick (): void {
    //this.pythonService.sendCommand('testCommand');
  }

  public moveLeft (): void {
    this.arduinoService.xAchsisMove(this.stepsToMoveInputValue, 0);
  }

  public moveRight (): void {
    this.arduinoService.xAchsisMove(this.stepsToMoveInputValue, 1);
  }

  public moveUp (): void {
    this.arduinoService.yAchsisMove(this.stepsToMoveInputValue, 0);
  }

  public moveDown (): void {
    this.arduinoService.yAchsisMove(this.stepsToMoveInputValue, 1);
  }

}
