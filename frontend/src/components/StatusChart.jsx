import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

function StatusChart({ jobs }){
    const data=[
        {
            status: "Applied",
            count: jobs.filter(
                (job) => job.status === "Applied"
            ).length,
        },
        {
            status: "Interview",
            count: jobs.filter(
                (job) => job.status === "Interview"
            ).length,
        },
        {
            status: "Rejected",
            count: jobs.filter(
                (job) => job.status === "Rejected"
            ).length,
        },
        {
            status: "Offer",
            count: jobs.filter(
                (job) => job.status === "Offer"
            ).length,
        },
    ];

    return (
        <ResponsiveContainer width= "100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status"/>
                <YAxis />
                <Tooltip/>
                <Bar dataKey="count" />
            </BarChart>
        </ResponsiveContainer>
    );
}
export default StatusChart;