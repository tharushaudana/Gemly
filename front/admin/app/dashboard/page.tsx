"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { dashboardData, products } from "@/lib/data";
import { Package, ShoppingBag, Star, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5200 },
];

const topProducts = [
  { name: "Diamond Rings", count: 35 },
  { name: "Gold Necklaces", count: 28 },
  { name: "Silver Earrings", count: 22 },
  { name: "Bracelets", count: 15 },
  { name: "Watches", count: 12 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Products"
          value={dashboardData.totalProducts}
          icon={<Package className="h-4 w-4" />}
          description="Total products in inventory"
        />
        <DashboardCard
          title="Best Sellers"
          value={dashboardData.bestSellers}
          icon={<Star className="h-4 w-4" />}
          description="Products marked as best sellers"
          variant="success"
        />
        <DashboardCard
          title="New Arrivals"
          value={dashboardData.newArrivals}
          icon={<ShoppingBag className="h-4 w-4" />}
          description="Recently added products"
          variant="info"
        />
        <DashboardCard
          title="Low Stock"
          value={dashboardData.lowStock}
          icon={<AlertTriangle className="h-4 w-4" />}
          description="Products with stock less than 5"
          variant="danger"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Overview of monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1) / 0.2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Categories</CardTitle>
            <CardDescription>Most popular product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
          <CardDescription>Latest additions to your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap p-2 text-left font-medium">Product</th>
                  <th className="whitespace-nowrap p-2 text-left font-medium">Category</th>
                  <th className="whitespace-nowrap p-2 text-left font-medium">Price</th>
                  <th className="whitespace-nowrap p-2 text-left font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-2 align-middle">{product.name}</td>
                    <td className="p-2 align-middle">{product.category}</td>
                    <td className="p-2 align-middle">${product.price.toLocaleString()}</td>
                    <td className="p-2 align-middle">
                      <div className="flex items-center gap-2">
                        <span>{product.stockQuantity}</span>
                        {product.stockQuantity < 5 && (
                          <span className="text-xs text-destructive">(Low)</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}