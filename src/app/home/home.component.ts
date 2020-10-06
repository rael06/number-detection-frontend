import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { IDraw } from "../shared/models/IDraw";
import { IOperation } from "../shared/models/IOperation";
import { CanvasComponent } from "../shared/components/canvas/canvas.component";
import { BlackboardComponent } from "../shared/components/blackboard/blackboard.component";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(CanvasComponent, { static: false }) canvasComponent;
  @ViewChild(BlackboardComponent, { static: false }) blackboardComponent;
  public operation: IOperation = {
    number1: [],
    number2: [],
  };
  public loading = false;
  public canvasSize: number;
  private digitIndex = 0;
  private numberIndex = 0;

  public constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  clearOperation() {
    this.reset();
    this.canvasComponent.clear();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.defineCanvasSize();
    const blackboardElements = document.querySelectorAll<HTMLImageElement>(
      "app-blackboard img"
    );
    blackboardElements.forEach((i) => {
      i.style.visibility = "hidden";
    });
    this.blackboardComponent.imgSize = "50%";
    this.blackboardComponent.resizeImages();
    setTimeout(
      () =>
        blackboardElements.forEach((i) => {
          i.style.visibility = "visible";
        }),
      0
    );
  }

  ngAfterViewInit(): void {
    this.defineCanvasSize();
    this.cdRef.detectChanges();
  }

  public setOperator(value: string): void {
    this.operation.operator = value;
    this.digitIndex = 0;
    this.numberIndex++;
    this.blackboardComponent.resizeImages();
  }

  public async sendOperation(): Promise<void> {
    this.loading = true;
    const options = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.operation),
    };

    this.operation = (await fetch(environment.api, options)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err.statusText);
      })) as IOperation;
    this.loading = false;
  }

  private reset() {
    this.digitIndex = 0;
    this.numberIndex = 0;
    this.operation = {
      number1: [],
      number2: [],
      operator: undefined,
    };
    this.blackboardComponent.imgSize = "50%";
  }

  public saveDraw(dataURI: string) {
    const draw: IDraw = {
      numberIndex: this.numberIndex,
      digitIndex: this.digitIndex,
      name: this.numberIndex + "_" + this.digitIndex,
      data: dataURI,
    };
    if (this.numberIndex === 0) {
      this.operation.number1.push(draw);
    } else {
      this.operation.number2.push(draw);
    }
    this.digitIndex++;
    this.blackboardComponent.resizeImages();
  }

  private defineCanvasSize() {
    this.canvasSize =
      document.body.offsetWidth > 1200
        ? 400
        : document.body.offsetWidth < 400
        ? 250
        : 325;
    this.canvasComponent.canvas.setWidth(this.canvasSize);
    this.canvasComponent.canvas.setHeight(this.canvasSize);
  }
}
