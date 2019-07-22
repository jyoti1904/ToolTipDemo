import { Component, ViewChild, ViewChildren, ElementRef, QueryList, HostListener, AfterViewInit } from '@angular/core';
import { FocusTrapFactory, FocusMonitor, ListKeyManager} from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements AfterViewInit {

  keyManager: any;

  @ViewChild('element', {static: true}) element: ElementRef;
  @ViewChildren('elementChild') elementChild: QueryList<any>;

  constructor( private focusTrap: FocusTrapFactory,
               private focusMonitor: FocusMonitor ) {}

  ngAfterViewInit() {
    this.keyManager = new ListKeyManager(this.elementChild);
    this.keyManager.withHorizontalOrientation('ltr');
    this.keyManager.withWrap();
  }


  @HostListener('window:keyup', ['$event'])
  keyFunc(event) {
    if (event.code !== 'Tab') {
      this.keyManager.onKeydown(event);
      this.focusMonitor.focusVia(this.keyManager.activeItem.nativeElement, 'keyboard');
    } else {
      this.keyManager.onKeydown(event);
      this.keyManager.setNextItemActive();
    }
  }


  testAccessibility() {
    this.element.nativeElement.hidden = false;
    const focusTrap = this.focusTrap.create(this.element.nativeElement);
    focusTrap.focusInitialElement();
    this.keyManager.setFirstItemActive();
  }

}

