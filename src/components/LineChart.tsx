import Chart from "react-google-charts";

interface Props {
  location: string;
  data: any[];
  locationId: string;
}

export function LineChart(props: Props) {
  const data = props.data || [];
  return (
    <div>
      <Chart
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          hAxis: {
            title: "Time",
          },
          vAxis: {
            title: `Pollution  - ${props.location} - ( id ${props.locationId})`,
          },
          //   series: {
          //     1: { curveType: "function" },
          //   },
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
}
