import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: '[prefix-value]',
  standalone: true,
})
export class PrefixValueDirective implements OnInit {
  @Input() type!: number;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    let element = this.elementRef.nativeElement;

    if (!this.type || this.type == 0) return;
    if (this.type > 0) {
      element.style.color = '#00d343'
    }
    if (this.type < 0) {
      element.style.color = '#d13344'
    }
  }

}
