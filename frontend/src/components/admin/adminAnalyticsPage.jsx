import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const dummySalesData = [
  { date: "2025-07-20", revenue: 4500, orders: 120 },
  { date: "2025-07-21", revenue: 5200, orders: 135 },
  { date: "2025-07-22", revenue: 4800, orders: 110 },
  { date: "2025-07-23", revenue: 6000, orders: 150 },
  { date: "2025-07-24", revenue: 7500, orders: 180 },
];

const dummyTopItems = [
  { name: "Margherita Pizza", orders: 90 },
  { name: "Veg Biryani", orders: 75 },
  { name: "Chicken Burger", orders: 65 },
  { name: "Paneer Wrap", orders: 55 },
];

const dummyCustomers = [
  { type: "Returning", value: 70 },
  { type: "New", value: 30 },
];

const COLORS = ["#0088FE", "#FF8042"];

const AnalyticsReportsPage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Simulate data fetch
    setSalesData(dummySalesData);
  }, []);

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">
        Analytics & Reports
      </h1>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">₹{totalRevenue}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Avg Order Value</h2>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            ₹{avgOrderValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Sales Line Chart */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Items Bar Chart */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Most Ordered Items</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyTopItems}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Behavior Pie Chart */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dummyCustomers}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {dummyCustomers.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;