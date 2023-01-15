import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "../../../react/components/Router";

const containerElementName = "customReactComponentContainer";

@Component({
  selector: "app-wrapper",
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
  encapsulation: ViewEncapsulation.None,
})
export class CustomReactComponentWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  @Input() Component: any;
  @Input() props: any;
  private root?: ReactDOM.Root;

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    this.root?.unmount();
  }

  private render() {
    const { Component, props } = this;
    if (!this.root) {
      this.root = ReactDOM.createRoot(this.containerRef.nativeElement);
    }
    if (Component) {
      this.root.render(
        <React.StrictMode>
          <BrowserRouter>
            <Component {...props} />
          </BrowserRouter>
        </React.StrictMode>
      );
    } else {
      this.root.render(
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      );
    }
  }
}
