import Chart from "react-apexcharts"

// This package makes it possible to parse strings that look like JSON but aren't, just like the challenge input.
const dJSON = require('dirty-json');

interface LineChartProps {
    data: string
}

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const firstLetterUpperCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const chartData: ChartData = {
    labels: {
        categories: [""]
    },
    series: []
}

const LineChart = (props: LineChartProps) => {

    /*
    This function receives the inserted text and transform the lines into objects.
    From these objects, it is possible to extract the categories that make up the chart, and the date range.
    Then the date range is converted to mm:ss.
    Then each element with the type "data" is added to the chart data if it's inside the date range.
    */
    const parseData = (info: string) => {
        const lines = info.split("\n");
        for (let i = 0; i < lines.length; i++) {
            lines[i] = dJSON.parse(lines[i])
        }
        const start: any = lines[0];
        const group = start["group"];
        const select = start["select"];
        const span: any = lines[1];
        const begin = span["begin"];
        const end = span["end"];
        const min = ((end - begin) / (60 * 60000));
        const segString = ((min - Math.floor(min)) * 60).toFixed(0).toString().padStart(2, "0");
        const minString = min.toFixed(0).toString().padStart(2, "0");
        const myLabels = ["00:00", `${minString}:${segString}`];
        const mySeries: SeriesData[] = [];
        for (let i = 2; i < lines.length; i++) {
            const element: any = lines[i];
            if (element["type"] === "stop") break;
            if (element["type"] !== "data") continue;
            if (element["timestamp"] > end) break;
            const aux: any = lines[i];
            const os = firstLetterUpperCase(aux[group[0]]);
            const browser = firstLetterUpperCase(aux[group[1]])
            let select1 = select[0].split("_");
            for (let j = 0; j < select1.length; j++) {
                select1[j] = firstLetterUpperCase(select1[j]);
            }
            select1 = select1.join(" ")
            let select2 = select[1].split("_");
            for (let j = 0; j < select2.length; j++) {
                select2[j] = firstLetterUpperCase(select2[j]);
            }
            select2 = select2.join(" ")
            let insert1: boolean = false;
            let insert2: boolean = false;
            let j = 0;
            while ((insert2 === false || insert1 === false) && j < mySeries.length) {
                if (`${os} ${browser} ${select1}` == mySeries[j].name) {
                    mySeries[j].data.push(parseFloat(lines[i][select[0]]));
                    insert1 = true;
                }
                if (`${os} ${browser} ${select2}` == mySeries[j].name) {
                    mySeries[j].data.push(parseFloat(lines[i][select[1]]));
                    mySeries[j].data.sort();
                    insert2 = true;
                }
                j++;
            }
            if (insert1 === false) {
                mySeries.push({ name: `${os} ${browser} ${select1}`, data: [parseFloat(lines[i][select[0]])] });
            }
            if (insert2 === false) {
                mySeries.push({ name: `${os} ${browser} ${select2}`, data: [parseFloat(lines[i][select[1]])] });
            }
        }
        chartData.labels.categories = myLabels;
        chartData.series = mySeries;
    }

    if (props.data !== "") {
        parseData(props.data)
    }

    return (
        <Chart
            options={{
                xaxis: {
                    categories: chartData.labels.categories,
                    labels: {
                        show: true
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                legend: {
                    position: "right"
                },
                chart: {
                    zoom: {
                        enabled: false
                    }
                },
                markers: {
                    size: 10
                }
            }}
            series={chartData.series}
            type="line"
            height="300"
        />
    );
}

export default LineChart;