import React, { lazy, Suspense, useEffect, useState } from "react";

const ReactApexChart = lazy(() => import("react-apexcharts"));

const ApexChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [range, setRange] = useState("1Y");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formattedData = data.map((item) => ({
        x: new Date(item[0]).getTime(),
        y: item[1],
      }));
      setChartData([{ name: "Price", data: formattedData }]);
      setFilteredData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    if (chartData.length) {
      const data = filterDataByRange(chartData[0].data, range);
      setFilteredData(data);
    }
  }, [range, chartData]);

  const filterDataByRange = (data, range) => {
    const now = new Date().getTime(); // Get the current time in milliseconds
    let filteredData;

    switch (range) {
      case "1D":
        filteredData = data.filter(
          (item) => now - item.x <= 24 * 60 * 60 * 1000
        );
        break;
      case "30D":
        filteredData = data.filter(
          (item) => now - item.x <= 30 * 24 * 60 * 60 * 1000
        );
        break;
      case "3M":
        filteredData = data.filter(
          (item) => now - item.x <= 3 * 30 * 24 * 60 * 60 * 1000
        );
        break;
      case "1Y":
      default:
        filteredData = data;
        break;
    }

    return filteredData;
  };

  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Crypto Price Movement",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value) {
          const date = new Date(value);
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${hours}:${minutes}`;
        },
      },
      tickAmount: 10,
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  return (
    <div>
      <Suspense fallback={<div>Loading Chart...</div>}>
        <ReactApexChart
          options={options}
          series={[{ name: "Price", data: filteredData }]}
          type="area"
          width={1100}
          height={550}
        />
        <div
          style={{ marginBottom: "20px" }}
          className="mt-10 space-x-3 gap-10 flex items-center justify-center"
        >
          <button
            className="border bg-blue-600 py-2 px-10 mt-[10px] rounded-md"
            onClick={() => setRange("1D")}
          >
            1 Day
          </button>
          <button
            className="border bg-blue-600 py-2 px-8 mt-[10px] rounded-md"
            onClick={() => setRange("30D")}
          >
            30 Days
          </button>
          <button
            className="border bg-blue-600 py-2 px-5 mt-[10px] rounded-md"
            onClick={() => setRange("3M")}
          >
            3 Months
          </button>
          <button
            className="border bg-blue-600 py-2 px-8 mt-[10px] rounded-md"
            onClick={() => setRange("1Y")}
          >
            1 Year
          </button>
        </div>
      </Suspense>
    </div>
  );
};

export default ApexChart;
