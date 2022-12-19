import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import * as octicons from '@primer/octicons';

export interface OctIcon {
  key: octicons.IconName;
  color?: string;
  size?: number;
}

@Directive({
  selector: '[octicon]',
})
export class OcticonDirective implements OnInit {
  @Input() octicon!: OctIcon;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const el: HTMLElement = this.elementRef.nativeElement;
    el.innerHTML = octicons[this.octicon?.key].toSVG();
    const icon = el.firstChild;
    if (this.octicon?.color) {
      this.renderer.setStyle(icon, 'fill', this.octicon.color);
    }
    if (this.octicon?.size) {
      this.renderer.setStyle(icon, 'width', this.octicon.size);
      this.renderer.setStyle(icon, 'height', '100%');
    }
  }
}
