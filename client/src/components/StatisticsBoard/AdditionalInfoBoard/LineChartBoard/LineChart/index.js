import Component from '@/base/component';

export default class LineChart extends Component {
  constructor(parentNode, categoryChartData) {
    super(
      parentNode,
      'canvas',
      { class: 'line-chart', width: '750px', height: '300px' },
      categoryChartData,
    );
  }

  render(categoryChartData) {
    // fetch 받아와서 정제한 데이터
    this.data = categoryChartData;
    const totalSpents = this.data.map((value) => parseInt(value.totalSpent));

    this.chart = this.currentNode;
    this.chartWidth = this.chart.width;
    this.chartHeight = this.chart.height;
    this.ctx = this.currentNode.getContext('2d');
    this.cellSize = this.calculateCellSize(this.data.length * 2);
    const vertices = this.convertDataToVertices(totalSpents);
    const lineChartDrawingFunc = this.drawLineChart.bind(this, vertices);
    this.startDraw(1 / 30, lineChartDrawingFunc);
    this.drawGrid();
  }

  calculateCellSize(cellNum) {
    return this.chart.width / cellNum;
  }

  convertDataToVertices(data) {
    const yScaleConstant = (0.9 / Math.max(...data)) * this.chartHeight;
    const vertices = data.map((value, index) => [
      (2 * index + 1) * this.cellSize,
      this.chartHeight - yScaleConstant * value,
    ]);
    return vertices;
  }

  drawGrid() {
    const grid = new Path2D();
    for (let xPos = 0; xPos <= this.chartWidth; xPos += this.cellSize) {
      grid.moveTo(xPos, 0);
      grid.lineTo(xPos, this.chartHeight);
    }
    for (let yPos = 0; yPos <= this.chartHeight; yPos += this.cellSize) {
      grid.moveTo(0, yPos);
      grid.lineTo(this.chartWidth, yPos);
    }
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#F5F5F5';
    this.ctx.stroke(grid);
  }

  drawLineChart(vertices, ratio) {
    this.ctx.clearRect(0, 0, this.chartWidth, this.chartHeight);

    const lineChart = new Path2D();
    lineChart.moveTo(...this.convertVertexByRatio(vertices[0], ratio));
    for (const vertex of vertices) {
      const [xPos, yPos] = this.convertVertexByRatio(vertex, ratio);
      // this.ctx.fillText('Hello world', vertex[0] - 20, vertex[1] - 10);
      lineChart.arc(xPos, yPos, 2, 0, 2 * Math.PI);
      lineChart.lineTo(xPos, yPos);
    }
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#2AC1BC';
    this.ctx.stroke(lineChart);
  }

  convertVertexByRatio(vertex, ratio) {
    const [xPos, yPos] = vertex;
    const currentYPos = yPos * ratio + (this.chartHeight / 2) * (1 - ratio);
    return [xPos, currentYPos];
  }

  startDraw(ratio = 1, drawFunc) {
    const startAnimation = () => {
      let t = 0;
      const animation = () => {
        t += ratio;
        drawFunc(t);
        if (t < 1) {
          requestAnimationFrame(animation);
        } else {
          drawFunc(1);
        }
      };
      return animation;
    };
    startAnimation()();
  }
}
