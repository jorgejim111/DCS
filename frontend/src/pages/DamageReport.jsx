import React, { useState, useEffect } from "react";
import BaseTableReadOnly from "../components/BaseTableReadOnly";
import { exportToExcel } from "../utils/exportToExcel";
import damageReportService from "../services/damageReportService";

const columns = [
  { Header: "ID.DR", accessor: "id" },
  { Header: "Serial#", accessor: "serial" },
  { Header: "Created At", accessor: "createdAt" },
  { Header: "Product", accessor: "product" },
  { Header: "Line", accessor: "line" },
  { Header: "Supervisor#", accessor: "supervisor" },
  { Header: "Operator#", accessor: "operator" },
  { Header: "Description", accessor: "description" },
  { Header: "Explanation", accessor: "explanation" },
  { Header: "Note", accessor: "note" },
  { Header: "Sample", accessor: "sample" },
  { Header: "Status", accessor: "status" },
  { Header: "Veredict", accessor: "veredict" },
  { Header: "Last Modified At", accessor: "updatedAt" },
];

export default function DamageReport() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);


  const pageSize = 20;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, startDate, endDate]);

  const fetchData = async () => {
    setLoading(true);
    const res = await damageReportService.getAll({
      page,
      pageSize,
      startDate,
      endDate,
    });
    setData(res.data || []);
    setPageCount(res.pageCount || 1);
    setLoading(false);
  };

  const handleExport = () => {
    exportToExcel(data, "DamageReport");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Damage Report</h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <span>And</span>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleExport}
          className="ml-4 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>
      <BaseTableReadOnly
        columns={columns}
        data={data}
        loading={loading}
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    </div>
  );
}
