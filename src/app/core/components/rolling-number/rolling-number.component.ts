import {Component, Input, SimpleChanges} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-rolling-number',
  imports: [],
  templateUrl: './rolling-number.component.html',
  styleUrl: './rolling-number.component.scss',
  animations: [
    trigger('digitRoll', [
      transition('* => rolling', [
        style({ transform: 'translateY({{startPos}}%)' }),
        animate('{{duration}}ms cubic-bezier(0.5, 0, 0.5, 1)',
          style({ transform: 'translateY({{endPos}}%)' }))
      ])
    ])
  ]
})
export class RollingNumberComponent {

  @Input() value: number = 0;
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() decimals: number = 0;
  @Input() minIntegerDigits: number = 1;
  @Input() direction: 'up' | 'down' = 'up';
  @Input() duration: number = 2000; // Animation duration in ms

  previousValue: number = 0;
  digitGroups: {
    value: number;
    startPosition: number;
    endPosition: number;
    animationState: string;
    duration: number;
  }[] = [];

  decimalDigitGroups: {
    value: number;
    startPosition: number;
    endPosition: number;
    animationState: string;
    duration: number;
  }[] = [];

  numberRange = Array.from({ length: 10 }, (_, i) => i);

  constructor() {
    this.initializeDigits();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['decimals'] || changes['minIntegerDigits']) {
      this.updateDigits();
    }
  }

  private initializeDigits(): void {
    const { integerDigits, decimalDigits } = this.getFormattedParts(this.value);

    // Setup integer digits
    this.digitGroups = integerDigits.map(digit => ({
      value: parseInt(digit),
      startPosition: -parseInt(digit) * 100,
      endPosition: -parseInt(digit) * 100,
      animationState: 'initial',
      duration: this.duration
    }));

    // Setup decimal digits
    this.decimalDigitGroups = decimalDigits.map(digit => ({
      value: parseInt(digit),
      startPosition: -parseInt(digit) * 100,
      endPosition: -parseInt(digit) * 100,
      animationState: 'initial',
      duration: this.duration
    }));

    this.previousValue = this.value;
  }

  private updateDigits(): void {
    const isIncreasing = this.value > this.previousValue;
    const { integerDigits, decimalDigits } = this.getFormattedParts(this.value);
    const { integerDigits: prevIntDigits, decimalDigits: prevDecDigits } =
      this.getFormattedParts(this.previousValue);

    // Calculate durations based on digit position
    const baseDuration = this.duration;
    const durationDecrement = baseDuration / 5;

    // Update integer digits
    this.digitGroups = integerDigits.map((digitStr, index) => {
      const digit = parseInt(digitStr);
      const prevDigit = index < prevIntDigits.length
        ? parseInt(prevIntDigits[index])
        : 0;

      // Don't animate if the digit hasn't changed
      if (digit === prevDigit && this.digitGroups[index]?.value === digit) {
        return {
          value: digit,
          startPosition: -digit * 100,
          endPosition: -digit * 100,
          animationState: 'stable',
          duration: baseDuration
        };
      }

      // Calculate positions for animation
      let startPos: number;
      let endPos: number = -digit * 100;

      if (isIncreasing) {
        // For increasing values, start 9 digits above current
        startPos = endPos + 900;
        if (this.direction === 'down') {
          startPos = endPos - 900;
        }
      } else {
        // For decreasing values, start 9 digits below current
        startPos = endPos - 900;
        if (this.direction === 'down') {
          startPos = endPos + 900;
        }
      }

      // Position-based animation duration (further right = faster)
      const posDuration = Math.max(
        baseDuration - (integerDigits.length - index - 1) * durationDecrement,
        baseDuration / 2
      );

      return {
        value: digit,
        startPosition: startPos,
        endPosition: endPos,
        animationState: 'rolling',
        duration: posDuration
      };
    });

    // Update decimal digits with similar logic
    this.decimalDigitGroups = decimalDigits.map((digitStr, index) => {
      const digit = parseInt(digitStr);
      const prevDigit = index < prevDecDigits.length
        ? parseInt(prevDecDigits[index])
        : 0;

      if (digit === prevDigit && this.decimalDigitGroups[index]?.value === digit) {
        return {
          value: digit,
          startPosition: -digit * 100,
          endPosition: -digit * 100,
          animationState: 'stable',
          duration: baseDuration
        };
      }

      let startPos: number;
      let endPos: number = -digit * 100;

      if (isIncreasing) {
        startPos = endPos + 900;
        if (this.direction === 'down') {
          startPos = endPos - 900;
        }
      } else {
        startPos = endPos - 900;
        if (this.direction === 'down') {
          startPos = endPos + 900;
        }
      }

      // Decimal positions animate faster
      const posDuration = Math.max(
        baseDuration - (decimalDigits.length + index + 1) * durationDecrement,
        baseDuration / 3
      );

      return {
        value: digit,
        startPosition: startPos,
        endPosition: endPos,
        animationState: 'rolling',
        duration: posDuration
      };
    });

    this.previousValue = this.value;
  }

  private getFormattedParts(value: number): {
    integerDigits: string[],
    decimalDigits: string[]
  } {
    // Format number to string with fixed decimal places
    const formatted = Math.abs(value).toFixed(this.decimals);

    // Split into integer and decimal parts
    const parts = formatted.split('.');

    // Pad integer part to meet minimum length
    const integerPart = parts[0].padStart(this.minIntegerDigits, '0');

    // Get decimal part if exists
    const decimalPart = parts.length > 1 ? parts[1] : '';

    return {
      integerDigits: integerPart.split(''),
      decimalDigits: decimalPart.split('')
    };
  }

}
