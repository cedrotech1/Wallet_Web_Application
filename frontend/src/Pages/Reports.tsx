import instance from "@/API";
import { tableColumn } from "@/commonTypes";
import TableReport from "@/Components/TableReport";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const columns: tableColumn[] = [
  { title: "Description", key: "description" },
  { title: "Amount", key: "amount" },
  { title: "Account", key: "account" },
  { title: "Category", key: "category" },
  { title: "Sub category", key: "subcategory" },
  { title: "Created Date ", key: "date" },  
];

function Transactions() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState({ totalExpense: 0, totalIncome: 0 });
  const [chartData, setChartData] = useState<any>(null);

  const getAllTransactions = async (start?: string, end?: string) => {
    setLoading(true);
    let url = "/transaction";
    if (start && end) {
      url = `/transaction/transaction-report?startDate=${start}&endDate=${end}`;
    }
    await instance
      .get(url)
      .then((res) => {
        const transactionData = res.data.data.map((el: any) => ({
          id: el.id,
          description: el.description,
          amount: el.amount,
          account: el.account.name,
          subcategory: el.subcategory.name,
          category: el.subcategory.category.name,
          date: new Date(el.createdAt).toLocaleString(),
        }));
        setTransactions(transactionData);

        // Update summary
        if (res.data.summary) {
          setSummary({
            totalExpense: res.data.summary.totalExpense,
            totalIncome: res.data.summary.totalIncome,
          });
        }

        // Prepare chart data
        const categoryTotals = transactionData.reduce((acc: any, transaction: any) => {
          acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
          return acc;
        }, {});
        setChartData({
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: "Transaction Amount by Category",
              data: Object.values(categoryTotals),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        });
      })
      .catch(() => toast.error("Failed to fetch transactions"))
      .finally(() => setLoading(false));
  };

  const handleFilter = () => {
    if (startDate && endDate) {
      getAllTransactions(startDate, endDate);
    } else {
      toast.error("Please provide both start and end dates");
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div>
      <div className="flex justify-between my-3">
        <p className="p-2 bg-zinc-200">
          Transactions{" "}
          <span className="p-3 font-bold">
            {loading ? "..." : transactions.length}
          </span>
        </p>
      </div>
      <div className="my-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 mx-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 mx-2"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Report
        </button>
      </div>
      <div className="my-4">
        <p>Total Income: <span className="font-bold"> {summary.totalIncome} Rwf</span></p>
        <p>Total Expense: <span className="font-bold">{summary.totalExpense} Rwf </span></p>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-36">
          <HashLoader color="#000" loading={loading} size={15} />
        </div>
      ) : (
        <>
          <TableReport
            columns={columns}
            data={transactions}
            deleteAction={function (id: number): void {
              throw new Error("Function not implemented.");
            }}
            updateAction={function (id: number): void {
              throw new Error("Function not implemented.");
            }}
          />
          {chartData && (
            <div className="mt-6">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: { enabled: true },
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Transactions;
