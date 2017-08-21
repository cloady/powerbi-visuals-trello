/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

/// <reference path="_references.ts" />

module powerbi.extensibility.visual.test {
    // powerbi.extensibility.utils.type
    import ValueType = powerbi.extensibility.utils.type.ValueType;

    // powerbi.extensibility.utils.test
    import TestDataViewBuilder = powerbi.extensibility.utils.test.dataViewBuilder.TestDataViewBuilder;
    import getRandomNumbers = powerbi.extensibility.utils.test.helpers.getRandomNumbers;

    export class VisualData extends TestDataViewBuilder {
        public static ColumnSource: string = "Source";
        public static ColumnDestination: string = "Destination";
        public static ColumnValue: string = "Value";

        public valuesSourceDestination: string[][] = [
            ["Brazil", "Portugal"],
            ["Brazil", "France"],
            ["Brazil", "Spain"],
            ["Brazil", "England"],
            ["Canada", "Portugal"],
            ["Canada", "France"],
            ["Canada", "England"],
            ["Mexico", "Portugal"],
            ["Mexico", "France"],
            ["Mexico", "Spain"],
            ["Mexico", "England"],
            ["USA", "Portugal"],
            ["USA", "France"],
            ["USA", "Spain"],
            ["USA", "England"],
            ["England", "USA"],
            ["Portugal", "Angola"],
            ["Portugal", "Senegal"],
            ["Portugal", "Morocco"],
            ["USA", "USA"],
            ["England", "Mexico"],
            ["Mexico", "Canada"]
        ];

        public valuesSourceDestinationWithWeigth: string[][] = [
            ["Brazil", "Portugal"],
            ["Brazil", "France"],
            ["Brazil", "Spain"]
        ];

        public valuesValue: number[] = getRandomNumbers(this.valuesSourceDestination.length, 10, 500);

        public valuesWithLowValue: number[] = getRandomNumbers(this.valuesSourceDestinationWithWeigth.length, 10, 50).map( (v) => v / 100);

        public getDataViewWithLowValue(columnNames?: string[]): DataView {
            return this.createCategoricalDataViewBuilder([
                {
                    source: {
                        displayName: VisualData.ColumnSource,
                        roles: { [VisualData.ColumnSource]: true },
                        type: ValueType.fromDescriptor({ text: true })
                    },
                    values: this.valuesSourceDestinationWithWeigth.map(x => x[0])
                },
                {
                    source: {
                        displayName: VisualData.ColumnDestination,
                        roles: { [VisualData.ColumnDestination]: true },
                        type: ValueType.fromDescriptor({ text: true }),
                    },
                    values: this.valuesSourceDestinationWithWeigth.map(x => x[1])
                }
            ], [
                {
                    source: {
                        displayName: VisualData.ColumnValue,
                        roles: { [VisualData.ColumnValue]: true },
                        isMeasure: true,
                        type: ValueType.fromDescriptor({ numeric: true }),
                    },
                    values: this.valuesWithLowValue
                }
            ], columnNames).build();
        }

        public getDataView(columnNames?: string[]): DataView {
            return this.createCategoricalDataViewBuilder([
                {
                    source: {
                        displayName: VisualData.ColumnSource,
                        roles: { [VisualData.ColumnSource]: true },
                        type: ValueType.fromDescriptor({ text: true })
                    },
                    values: this.valuesSourceDestination.map(x => x[0])
                },
                {
                    source: {
                        displayName: VisualData.ColumnDestination,
                        roles: { [VisualData.ColumnDestination]: true },
                        type: ValueType.fromDescriptor({ text: true }),
                    },
                    values: this.valuesSourceDestination.map(x => x[1])
                }
            ], [
                {
                    source: {
                        displayName: VisualData.ColumnValue,
                        roles: { [VisualData.ColumnValue]: true },
                        isMeasure: true,
                        type: ValueType.fromDescriptor({ numeric: true }),
                    },
                    values: this.valuesValue
                }
            ], columnNames).build();
        }
    }
}