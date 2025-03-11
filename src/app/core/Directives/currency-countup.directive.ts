
import { Directive, ElementRef, Input, OnChanges, SimpleChanges, NgZone } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[currencyCountUp]'
})
export class CurrencyCountUpDirective implements OnChanges {
  @Input('currencyCountUp') targetValue: number = 0;
  @Input() duration: number = 800; // milliseconds
  @Input() currency: string = 'NGN';

  private startValue: number = 0;
  private startTime: number = 0;
  private animationFrame: number | null = null;

  constructor(private el: ElementRef<HTMLElement>, private ngZone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetValue']) {
      // If first change, just set the value without animation
      if (changes['targetValue'].firstChange) {
        this.el.nativeElement.textContent = this.formatCurrency(this.targetValue);
        return;
      }

      // For subsequent changes, animate
      this.startValue = changes['targetValue'].previousValue || 0;
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.startTime = Date.now();

    // Run animation outside Angular's change detection for better performance
    this.ngZone.runOutsideAngular(() => {
      this.updateValue();
    });
  }

  private updateValue(): void {
    const now = Date.now();
    const elapsed = now - this.startTime;

    let currentValue = this.startValue;

    if (elapsed < this.duration) {
      // Use easeOutQuint for smooth deceleration
      const progress = elapsed / this.duration;
      const easeProgress = 1 - Math.pow(1 - progress, 5);

      currentValue = this.startValue + (this.targetValue - this.startValue) * easeProgress;
      this.animationFrame = requestAnimationFrame(() => this.updateValue());
    } else {
      currentValue = this.targetValue;
    }

    this.ngZone.run(() => {
      this.el.nativeElement.textContent = this.formatCurrency(currentValue);
    });
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency,
      currencyDisplay: 'narrowSymbol'
    }).format(amount);
  }
}
