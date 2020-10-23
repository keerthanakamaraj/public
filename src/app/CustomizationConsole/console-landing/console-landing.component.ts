import { Component, ElementRef, ViewChildren, QueryList, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-console-landing',
  templateUrl: './console-landing.component.html',
  styleUrls: ['./console-landing.component.css']
})
export class ConsoleLandingComponent implements OnInit {

  @ViewChildren("options") options: QueryList<ElementRef>;

  ARIA_EXPANDED: string = "aria-expanded";
  TAB_INDEX: string = "tabindex";
  currentActiveDescdentElement: string;
  eleMap: Map<string, ElementRef>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  items: any = [
    {
      "name": "Pictures",
      "children": [
        {
          "name": "Vacation",
          "children": [
            {
              "name": "1",
              "children": null
            },
            {
              "name": "2",
              "children": null
            },
            {
              "name": "3",
              "children": [
                {
                  "name": "3.1",
                  "children": null
                },
                {
                  "name": "3.2",
                  "children": null
                },
                {
                  "name": "3.3",
                  "children": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "Movies",
      "children": [
        {
          "name": "m1",
          "children": null
        },
        {
          "name": "m2",
          "children": [
            {
              "name": "m2.1",
              "children": null
            }
          ]
        },
        {
          "name": "m3",
          "children": null
        }
      ]
    }
  ]

  getStateOfItem(item: any) {
    if (item != null && item.children != null && item.children.length > 0) {
      item.ariaExpanded = "false";
      return "false"
    }
    item.ariaExpanded = null;
    return null;
  }

  toggleSelection($event: any, item: any) {
    this.options.some((eleRef: ElementRef) => {
      let code = eleRef.nativeElement.getAttribute("data-code")
      if (code == item.name) {
        let isExpanded = eleRef.nativeElement.getAttribute(this.ARIA_EXPANDED);
        this.setElementAttribute(eleRef, this.ARIA_EXPANDED, (isExpanded == "true") ? "false" : "true");
        return true;
      }
    });
  }

  setElementAttribute(eleRef: ElementRef, attribute: string, value: string) {
    this.renderer.setAttribute(eleRef.nativeElement, attribute, value);
  }

}
