import { LineGraphUtils } from './line-graph-utils';
import { RowData } from 'src/app/model/RowData';
import { ILineChartData } from 'src/app/model/ILineChartData';
import { EFrequency } from 'src/app/model/EFrequency';
import { EAggregateDateOption } from 'src/app/model/EAggregateDateOption';

describe('LineGraphUtils', () => {
  it('should create an instance', () => {
    expect(new LineGraphUtils()).toBeTruthy();
  });

  /////////////////////////////////////// GENERATE TESTS /////////////////////////////////////////////////
  it('should generate 7 days worth of data', () => {
    const startDate = new Date(1970, 1, 1);
    const endDate = new Date(1970, 1, 7);
    const amount = 1;
    const rowData = RowData.createRowData(amount, 'Daily', startDate, '');
    const generatedChartData = LineGraphUtils.generateChartDataFromRowData(
      rowData.getAmount(),
      rowData.getFrequencyAsEnum(),
      rowData.getDate(),
      endDate
    );
    const expectedChartData: ILineChartData[] = [
      { x: new Date(1970, 1, 1), y: amount },
      { x: new Date(1970, 1, 2), y: amount },
      { x: new Date(1970, 1, 3), y: amount },
      { x: new Date(1970, 1, 4), y: amount },
      { x: new Date(1970, 1, 5), y: amount },
      { x: new Date(1970, 1, 6), y: amount },
      { x: new Date(1970, 1, 7), y: amount },
    ];
    expect(generatedChartData).toEqual(expectedChartData);
  });

  it('should generate 2 weeks worth of data', () => {
    const startDate = new Date(1970, 1, 1);
    const endDate = new Date(1970, 1, 15);
    const amount = 1;
    const rowData = RowData.createRowData(amount, 'Weekly', startDate, '');
    const generatedChartData = LineGraphUtils.generateChartDataFromRowData(
      rowData.getAmount(),
      rowData.getFrequencyAsEnum(),
      rowData.getDate(),
      endDate
    );
    const expectedChartData: ILineChartData[] = [
      { x: new Date(1970, 1, 1), y: amount },
      { x: new Date(1970, 1, 8), y: amount },
      { x: new Date(1970, 1, 15), y: amount },
    ];
    expect(generatedChartData).toEqual(expectedChartData);
  });

  it('should generate 3 months worth of data', () => {
    const startDate = new Date(1970, 1, 1);
    const endDate = new Date(1970, 3, 1);
    const amount = 1;
    const rowData = RowData.createRowData(amount, 'Monthly', startDate, '');
    const generatedChartData = LineGraphUtils.generateChartDataFromRowData(
      rowData.getAmount(),
      rowData.getFrequencyAsEnum(),
      rowData.getDate(),
      endDate
    );
    const expectedChartData: ILineChartData[] = [
      { x: new Date(1970, 1, 1), y: amount },
      { x: new Date(1970, 2, 1), y: amount },
      { x: new Date(1970, 3, 1), y: amount },
    ];
    expect(generatedChartData).toEqual(expectedChartData);
  });

  it('should generate 4 years worth of data', () => {
    const startDate = new Date(1970, 1, 1);
    const endDate = new Date(1973, 1, 1);
    const amount = 1;
    const rowData = RowData.createRowData(amount, 'Annual', startDate, '');
    const generatedChartData = LineGraphUtils.generateChartDataFromRowData(
      rowData.getAmount(),
      rowData.getFrequencyAsEnum(),
      rowData.getDate(),
      endDate
    );
    const expectedChartData: ILineChartData[] = [
      { x: new Date(1970, 1, 1), y: amount },
      { x: new Date(1971, 1, 1), y: amount },
      { x: new Date(1972, 1, 1), y: amount },
      { x: new Date(1973, 1, 1), y: amount },
    ];
    expect(generatedChartData).toEqual(expectedChartData);
  });

  it('should generate chart data for wallet', () => {
    const intial = 0;
    // this data increases and decreases the initial amount over time
    const deltaData: ILineChartData[] = [
      { x: new Date(1970, 1 - 1, 1), y: 1 },
      { x: new Date(1970, 2 - 1, 1), y: 2 },
      { x: new Date(1970, 3 - 1, 1), y: -3 },
    ];
    const generatedChartData = LineGraphUtils.generateChartDataFromDeltas(
      intial,
      deltaData
    );
    const expectedChartData: ILineChartData[] = [
      { x: new Date(1970, 1 - 1, 1), y: 1 },
      { x: new Date(1970, 2 - 1, 1), y: 3 },
      { x: new Date(1970, 3 - 1, 1), y: 0 },
    ];
    expect(generatedChartData).toEqual(expectedChartData);
  });

  /////////////////////////////////////// AGGREGATE TESTS //////////////////////////////////////////////

  it('should aggregate data by year', () => {
    // test data set 1 : all different years
    const testDataSet1: ILineChartData[] = [
      // 1970
      { x: new Date(1970, 1, 1), y: 1 },
      // 1971
      { x: new Date(1971, 1, 1), y: 1 },
    ];
    // test data set 2 : all same years
    const testDataSet2: ILineChartData[] = [
      // 1970
      { x: new Date(1970, 1, 1), y: 1 },
      // 1970
      { x: new Date(1970, 1, 1), y: 1 },
    ];

    // run test function
    const aggregateMap1 = LineGraphUtils.aggregateChartDataBy(
      testDataSet1,
      EAggregateDateOption.YEAR
    );
    const aggregateMap2 = LineGraphUtils.aggregateChartDataBy(
      testDataSet2,
      EAggregateDateOption.YEAR
    );

    // create expected results
    const expectedAggregateMap1 = new Map<string, number>();
    expectedAggregateMap1.set('1970', 1);
    expectedAggregateMap1.set('1971', 1);

    const expectedAggregateMap2 = new Map<string, number>();
    expectedAggregateMap2.set('1970', 2);

    // test results
    expect(aggregateMap1).toEqual(expectedAggregateMap1);
    expect(aggregateMap2).toEqual(expectedAggregateMap2);
  });

  it('should aggregate data by month', () => {
    // test data set 1 : all different month
    const testDataSet1: ILineChartData[] = [
      // 1970 January
      { x: new Date(1970, 1 - 1, 1), y: 1 },

      // 1970 February
      { x: new Date(1970, 2 - 1, 1), y: 1 },
    ];
    // test data set 2 : all same month
    const testDataSet2: ILineChartData[] = [
      // 1970 January
      { x: new Date(1970, 1 - 1, 1), y: 1 },
      // 1970 January
      { x: new Date(1970, 1 - 1, 1), y: 1 },
    ];

    // run test function
    const aggregateMap1 = LineGraphUtils.aggregateChartDataBy(
      testDataSet1,
      EAggregateDateOption.MONTH
    );
    const aggregateMap2 = LineGraphUtils.aggregateChartDataBy(
      testDataSet2,
      EAggregateDateOption.MONTH
    );

    // create expected results
    const expectedAggregateMap1 = new Map<string, number>();
    expectedAggregateMap1.set('1970/01', 1);
    expectedAggregateMap1.set('1970/02', 1);

    const expectedAggregateMap2 = new Map<string, number>();
    expectedAggregateMap2.set('1970/01', 2);

    // test results
    expect(aggregateMap1).toEqual(expectedAggregateMap1);
    expect(aggregateMap2).toEqual(expectedAggregateMap2);
  });

  it('should aggregate data by day', () => {
    // test data set 1 : all different day
    const testDataSet1: ILineChartData[] = [
      // 1970 January 1
      { x: new Date(1970, 1 - 1, 1), y: 1 },
      // 1970 January 2
      { x: new Date(1970, 1 - 1, 2), y: 1 },
    ];
    // test data set 2 : all same day
    const testDataSet2: ILineChartData[] = [
      // 1970 January 1
      { x: new Date(1970, 1 - 1, 1), y: 1 },
      // 1970 January 1
      { x: new Date(1970, 1 - 1, 1), y: 1 },
    ];

    // run test function
    const aggregateMap1 = LineGraphUtils.aggregateChartDataBy(
      testDataSet1,
      EAggregateDateOption.DAY
    );
    const aggregateMap2 = LineGraphUtils.aggregateChartDataBy(
      testDataSet2,
      EAggregateDateOption.DAY
    );

    // create expected results
    const expectedAggregateMap1 = new Map<string, number>();
    expectedAggregateMap1.set('1970/01/1', 1);
    expectedAggregateMap1.set('1970/01/2', 1);

    const expectedAggregateMap2 = new Map<string, number>();
    expectedAggregateMap2.set('1970/01/1', 2);

    // test results
    expect(aggregateMap1).toEqual(expectedAggregateMap1);
    expect(aggregateMap2).toEqual(expectedAggregateMap2);
  });
});
