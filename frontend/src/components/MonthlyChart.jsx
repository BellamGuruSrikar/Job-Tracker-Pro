import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart({ jobs }) {
  const monthCounts = {};

  jobs.forEach((job) => {
    const month = new Date(
      job.date_applied
    ).toLocaleString("default", {
      month: "short",
    });

    monthCounts[month] =
      (monthCounts[month] || 0) + 1;
  });

  const data = Object.keys(monthCounts).map(
    (month) => ({
      month,
      applications: monthCounts[month],
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="applications"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MonthlyChart;