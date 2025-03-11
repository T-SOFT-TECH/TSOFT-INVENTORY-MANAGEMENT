import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  Input,
  signal,
  viewChild,
} from '@angular/core';
import {CountUp} from 'countup.js';

@Component({
  selector: 'app-animated-metric',
  imports: [],
  templateUrl: './animated-metric.component.html',
  styleUrl: './animated-metric.component.scss'
})
export class AnimatedMetricComponent implements AfterViewInit{
  // Input setters that update signals
  @Input() set value(val: number) { this.value$.set(val); }
  @Input() set label(val: string) { this.label$.set(val || ''); }
  @Input() set subtitle(val: string) { this.subtitle$.set(val || ''); }
  @Input() set prefix(val: string) { this.prefix$.set(val || ''); }
  @Input() set suffix(val: string) { this.suffix$.set(val || ''); }
  @Input() set decimals(val: number) { this.decimals$.set(val || 0); }
  @Input() set duration(val: number) { this.duration$.set(val || 1.5); }

  // Internal signals
  private value$ = signal<number>(0);
  protected label$ = signal<string>('');  // Keep protected for template access
  protected subtitle$ = signal<string>('');  // Keep protected for template access
  private prefix$ = signal<string>('');
  private suffix$ = signal<string>('');
  private decimals$ = signal<number>(0);
  private duration$ = signal<number>(1.5);
  private countUp = signal<CountUp | null>(null);

  // DOM reference
  valueElement = viewChild.required<ElementRef>('valueElement');

  // Computed options for CountUp to optimize re-renders
  private countUpOptions = computed(() => ({
    startVal: 0,
    decimalPlaces: this.decimals$(),
    duration: this.duration$(),
    prefix: this.prefix$(),
    suffix: this.suffix$(),
    useEasing: true,
    useGrouping: true,
  }));

  constructor() {
    // Effect to update CountUp when value changes
    effect(() => {
      const currentValue = this.value$();
      const countUpInstance = this.countUp();

      if (countUpInstance) {
        // Update with new value, using current options
        countUpInstance.update(currentValue);
      }
    });
  }

  ngAfterViewInit() {
    this.initCountUp();
  }

  private initCountUp() {
    if (!this.valueElement()) return;

    const options = this.countUpOptions();
    const newCountUp = new CountUp(
      this.valueElement().nativeElement,
      this.value$(),
      options
    );

    if (!newCountUp.error) {
      newCountUp.start();
      this.countUp.set(newCountUp);
    } else {
      console.error('CountUp error:', newCountUp.error);
      // Fallback: set the value directly
      this.valueElement().nativeElement.textContent =
        `${options.prefix}${this.value$().toFixed(options.decimalPlaces)}${options.suffix}`;
    }
  }
}
