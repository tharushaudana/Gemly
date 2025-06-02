"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/product-form";
import { products as initialProducts } from "@/lib/data";
import { ProductType } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { MoreHorizontal, PlusCircle, Edit, Trash, Eye, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductType | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(null);
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [productToUpdateStock, setProductToUpdateStock] = useState<ProductType | null>(null);
  const [stockAdjustment, setStockAdjustment] = useState(0);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.collection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitProduct = (productData: ProductType) => {
    if (isEditing && currentProduct) {
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? productData : product
        )
      );
    } else {
      setProducts([...products, productData]);
    }
    
    setIsAdding(false);
    setIsEditing(false);
    setCurrentProduct(undefined);
  };

  const handleEditProduct = (product: ProductType) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDeleteProduct = (product: ProductType) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleUpdateStock = (product: ProductType) => {
    setProductToUpdateStock(product);
    setStockAdjustment(0);
    setStockDialogOpen(true);
  };

  const confirmStockUpdate = () => {
    if (productToUpdateStock) {
      const newQuantity = Math.max(0, productToUpdateStock.stockQuantity + stockAdjustment);
      
      setProducts(
        products.map((p) =>
          p.id === productToUpdateStock.id
            ? { ...p, stockQuantity: newQuantity }
            : p
        )
      );
      
      setStockDialogOpen(false);
      setProductToUpdateStock(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-60"
            />
            <Button onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {isAdding || isEditing ? (
          <ProductForm
            product={currentProduct}
            onSubmit={handleSubmitProduct}
            onCancel={() => {
              setIsAdding(false);
              setIsEditing(false);
              setCurrentProduct(undefined);
            }}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  {product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      No image
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {product.isNew && (
                      <Badge className="bg-blue-500">New</Badge>
                    )}
                    {product.isBestSeller && (
                      <Badge className="bg-amber-500">Best Seller</Badge>
                    )}
                    {product.stockQuantity < 5 && (
                      <Badge variant="destructive">Low Stock</Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {product.category} • {product.collection}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStock(product)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Manage Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProduct(product)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg">${product.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      Stock: {product.stockQuantity}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.metalType.map((metal) => (
                      <Badge key={metal} variant="outline">
                        {metal}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Stock Management Dialog */}
        <Dialog open={stockDialogOpen} onOpenChange={setStockDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Stock</DialogTitle>
              <DialogDescription>
                Update stock quantity for "{productToUpdateStock?.name}"
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Current Stock:</div>
                <div>{productToUpdateStock?.stockQuantity || 0}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Adjustment:</div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setStockAdjustment((prev) => prev - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{stockAdjustment}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setStockAdjustment((prev) => prev + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between font-medium">
                <div>New Stock:</div>
                <div>
                  {productToUpdateStock
                    ? Math.max(0, productToUpdateStock.stockQuantity + stockAdjustment)
                    : 0}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setStockDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmStockUpdate}>
                Update Stock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}