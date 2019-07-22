import { Directive, Input, EventEmitter, HostListener, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})


export class ToolTipDirective implements OnInit, OnDestroy{
  tooltip: HTMLElement;
  @Input('tooltip') toolTipText: string;
  @Input('tooltip-alignment') alignment: string;

  constructor(private elRef: ElementRef, private rdr: Renderer2) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.tooltip) {
      this.rdr.removeChild(document.body, this.tooltip);
      this.tooltip = null;
  }
  }


  @HostListener('click') onClick() {
    if (!this.tooltip) {
         this.ShowToolTip();
     }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
        const targetElement = event.target as HTMLElement;
        if (targetElement && !this.elRef.nativeElement.contains(targetElement)) {
       this.HideToolTip();
      }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.HideToolTip();
    }

  ShowToolTip() {
    this.tooltip = this.rdr.createElement('span');
    this.rdr.appendChild( this.tooltip, this.rdr.createText(this.toolTipText));
    this.rdr.appendChild(document.body, this.tooltip);
    this.rdr.addClass(this.tooltip, 'cls-tooltip');
    this.SetToolTipAlignment();
  }

  HideToolTip() {
     if (this.tooltip) {

        this.rdr.removeChild(document.body, this.tooltip);
        this.tooltip = null;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.tooltip) {
    const toolTipPosition = this.tooltip.getBoundingClientRect();
    const btnPosition = this.elRef.nativeElement.getBoundingClientRect();
    const YScrollPOs = window.pageYOffset;
    let toolTipTop = 0;
    const margin = 10;
    if (toolTipPosition.top < 0) {
      toolTipTop = btnPosition.bottom + (toolTipPosition.height - margin);
    } else {
      toolTipTop = btnPosition.top - (toolTipPosition.height + margin);
    }

    toolTipTop = toolTipTop + YScrollPOs;
    this.rdr.setStyle(this.tooltip, 'top', toolTipTop + 'px');
  }

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.SetToolTipAlignment();
  }


  SetToolTipAlignment() {
    if (!this.tooltip) {
      return;
    }
    const YScrollPOs = window.pageYOffset;
    const btnPosition = this.elRef.nativeElement.getBoundingClientRect();
    const toolTipPosition = this.tooltip.getBoundingClientRect();

    let toolTipTop = 0;
    let toolTipLeft = 0;
    const margin = 10;

    if (this.alignment.toLowerCase() === 'top') {
        toolTipTop = btnPosition.top - (toolTipPosition.height + margin);
        toolTipLeft = btnPosition.left - 10;

    } else if (this.alignment.toLowerCase() === 'bottom') {
        toolTipTop = btnPosition.bottom + (toolTipPosition.height - margin);
        toolTipLeft = btnPosition.left - 10;
    } else if (this.alignment.toLowerCase() === 'left') {
        toolTipTop = btnPosition.top + (btnPosition.height / 2) - margin;
        toolTipLeft = btnPosition.left - (toolTipPosition.width + margin);
    } else if (this.alignment.toLowerCase() === 'right') {
        toolTipTop = btnPosition.top + (btnPosition.height / 2) - margin;
        toolTipLeft = btnPosition.left + (toolTipPosition.width - margin);
    }
    toolTipTop = toolTipTop + YScrollPOs;
    this.rdr.setStyle(this.tooltip, 'top', toolTipTop + 'px');
    this.rdr.setStyle(this.tooltip, 'left', toolTipLeft + 'px');

  }


}
