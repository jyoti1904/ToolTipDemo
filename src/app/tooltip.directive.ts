import { Directive, Input, EventEmitter,HostListener,ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})


export class ToolTipDirective {
  tooltip: HTMLElement;  
  @Input('tooltip') toolTipText: string;
  @Input('tooltip-alignment') alignment: string;  

  constructor(private elRef: ElementRef, private rdr: Renderer2) { 

  }


  @HostListener('click') onClick() {
    if (!this.tooltip)
     { 
         this.ShowToolTip();
     }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
      debugger;
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
    this.rdr.appendChild( this.tooltip,this.rdr.createText(this.toolTipText));    
    this.rdr.appendChild(document.body, this.tooltip);
    this.rdr.addClass(this.tooltip,'cls-tooltip');
    this.SetToolTipAlignment();
  }

  HideToolTip() 
  {
     if(this.tooltip)
    {
        
        this.rdr.removeChild(document.body, this.tooltip);
        this.tooltip = null;
    }
  }

  SetToolTipAlignment()
  {
    let btnPosition= this.elRef.nativeElement.getBoundingClientRect();
    let toolTipPosition =this.tooltip.getBoundingClientRect();

    let toolTipTop=0;
    let toolTipLeft=0;
    const margin=10;

    if(this.alignment.toLowerCase()=="top")
    {
        toolTipTop= btnPosition.top -(toolTipPosition.height+margin);
        toolTipLeft = btnPosition.left-10;

    }
    else if (this.alignment.toLowerCase()=="bottom")
    {
        toolTipTop= btnPosition.bottom +(toolTipPosition.height-margin);
        toolTipLeft = btnPosition.left-10;
    }
    else if (this.alignment.toLowerCase()=="left")
    {
        toolTipTop= btnPosition.top +(btnPosition.height/2)-margin;
        toolTipLeft = btnPosition.left-(toolTipPosition.width+margin);
    }
    else if (this.alignment.toLowerCase()=="right")
    {
        toolTipTop= btnPosition.top +(btnPosition.height/2)-margin;
        toolTipLeft = btnPosition.left+(toolTipPosition.width-margin);
    }
    this.rdr.setStyle(this.tooltip, 'top', toolTipTop+'px');
    this.rdr.setStyle(this.tooltip, 'left', toolTipLeft+'px'); 

  }
}
