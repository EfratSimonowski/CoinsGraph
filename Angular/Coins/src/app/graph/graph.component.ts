import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoinsService, CoinData } from '../server/server.service';


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, NgxChartsModule ,MatProgressSpinnerModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  currencies = ['USD', 'EUR', 'GBP', 'JPY'];
  timeRanges = ['שבוע', 'חודש', 'שנה', 'חצי שנה'];
  chartTypes = ['line', 'pie', 'bar'];

  selectedCurrency = this.currencies[0];
  selectedTimeRange = this.timeRanges[0];
  selectedChartType = this.chartTypes[0];

  chartData: any[] = [];
  colorScheme = 'cool';

  constructor(private coinsService: CoinsService) {}

  ngOnInit(): void {
    this.updateChartData();
  }

  onSelectionChange(): void {
    this.updateChartData();
  }

  onChartTypeChange(): void {
    // אין צורך לעשות כאן משהו כרגע
  }

  updateChartData(): void {
    this.coinsService.getCoinsRange(this.selectedCurrency, this.selectedTimeRange).subscribe({
      next: (data: CoinData[]) => {
        const series = data.map(item => ({
          name: new Date(item.date).toLocaleDateString('he-IL'),
          value: item.price
        }));

        this.chartData = [{
          name: this.selectedCurrency,
          series
        }];
      },
      error: (err) => {
        console.error('שגיאה בטעינת נתונים', err);
        this.chartData = [];
      }
    });
  }
}
