import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

type target = {
  id: number;
  name: string;
  weight: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-product';
  info: any[] = [];
  infoFillter: target[] = [];
  final: any = [];

  constructor(private HTTP: HttpClient) {}

  ngOnInit(): void {
    this.HTTP.get('assets/exam-data.json').subscribe((data: any) => {
      this.info = data;
      this.onCutData();
    });
  }

  onCutData() {
    const fillter_product: any = [];
    this.info.forEach((rs, index) => {
      fillter_product.push(
        rs.products.filter((item: any) => {
          return item.is_has_sub_product === false;
        })
      );
    });
    this.onFiltterData(fillter_product);
  }

  onFiltterData(fillter_product: any) {
    fillter_product.forEach((item: target[]) => {
      if (item.length !== 0) {
        item.forEach((data: any, i: number) => {
          // console.log(data);
          const insert_data = {
            id: item[i].id,
            name: item[i].name,
            weight: item[i].weight * data.amount,
          };
          this.infoFillter.push(insert_data);
        });
      }
    });
    this.onSumData();
  }

  onSumData() {
    const idTotals: { [id: number]: { name: string; weight: number } } = {};
    this.infoFillter.forEach((item: target) => {
      if (idTotals[item.id]) {
        idTotals[item.id].weight += item.weight;
      } else {
        idTotals[item.id] = { name: item.name, weight: item.weight };
      }
    });
    this.final = Object.values(idTotals);
    console.log(this.final);
  }
}
