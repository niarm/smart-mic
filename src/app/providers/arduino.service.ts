import {Board, Led, Stepper} from 'johnny-five';
import ReadableStream = NodeJS.ReadableStream;
import {Readable} from 'stream';
import {Injectable} from '@angular/core';

@Injectable()
export class ArduinoService {

  private activeBoard: Board;
  private testLED: Led;
  private stepperX: Stepper;
  private stepperY: Stepper;

  private standardSpeed = 90;

  constructor () {
  }

  public initBoard (): void {
    this.activeBoard = new Board({repl: false});

    this.activeBoard.on('ready', () => {
      console.log('BOARD READY', this.activeBoard);

      this.testLED = new Led(13);
      this.stepperX = new Stepper({
        type: Stepper.TYPE.FOUR_WIRE,
        stepsPerRev: 200,
        pins: {
          motor1: 4,
          motor2: 5,
          motor3: 6,
          motor4: 3,
        }
      });

      this.stepperY = new Stepper({
        type: Stepper.TYPE.FOUR_WIRE,
        stepsPerRev: 200,
        pins: {
          motor1: 8,
          motor2: 9,
          motor3: 10,
          motor4: 11,
        }
      });

    });
  }

  public toggleTestLED (): void {
    this.testLED.toggle();
  }

  public xAchsisMove (steps: number, direction: number): void {
    if (direction === 1) {
      this.stepperX.rpm(this.standardSpeed).cw().step(steps, () => {
        console.log("done Moving x-Achsis: " + steps);
      });
    } else {
      this.stepperX.rpm(this.standardSpeed).ccw().step(steps, () => {
        console.log("done Moving x-Achsis: " + steps);
      });
    }
  }

  public yAchsisMove (steps: number, direction: number): void {
    if (direction === 1) {
      this.stepperY.rpm(this.standardSpeed).cw().step(steps, () => {
        console.log("done Moving y-Achsis: " + steps);
      });
    } else {
      this.stepperY.rpm(this.standardSpeed).ccw().step(steps, () => {
        console.log("done Moving y-Achsis: " + steps);
      });
    }
  }


}

