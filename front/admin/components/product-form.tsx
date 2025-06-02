"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { ImageUpload } from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productOptions } from "@/lib/data";
import { ProductType } from "@/lib/types";
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  images: z.array(z.string()).min(1, { message: "Add at least one product image" }),
  category: z.string({ required_error: "Please select a category" }),
  collection: z.string({ required_error: "Please select a collection" }),
  metalType: z.array(z.string()).min(1, { message: "Select at least one metal type" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  shortDescription: z.string().min(5, { message: "Short description must be at least 5 characters" }),
  isNew: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  availableSizes: z.array(z.string()).min(1, { message: "Select at least one available size" }),
  stockQuantity: z.coerce.number().int().positive({ message: "Stock quantity must be a positive integer" }),
});

type ProductFormProps = {
  product?: ProductType;
  onSubmit: (data: ProductType) => void;
  onCancel: () => void;
};

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      name: "",
      price: 0,
      images: [],
      category: "",
      collection: "",
      metalType: [],
      description: "",
      shortDescription: "",
      isNew: false,
      isBestSeller: false,
      availableSizes: [],
      stockQuantity: 1,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    const productData: ProductType = {
      ...values,
      id: values.id || uuidv4(),
    };
    onSubmit(productData);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Diamond Eternity Ring" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isNew"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>New Arrival</FormLabel>
                          <FormDescription>
                            Mark as new product
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isBestSeller"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Best Seller</FormLabel>
                          <FormDescription>
                            Mark as best seller
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Categories and Descriptions */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productOptions.categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="collection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select collection" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productOptions.collections.map((collection) => (
                            <SelectItem key={collection} value={collection}>
                              {collection}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Brief description for product listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Metal Types and Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="metalType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metal Types</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={productOptions.metalTypes.map(type => ({ value: type, label: type }))}
                        selected={Array.isArray(field.value) ? field.value : []}
                        onChange={field.onChange}
                        placeholder="Select metal types"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availableSizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Sizes</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={productOptions.sizes.map(size => ({ value: size, label: size }))}
                        selected={Array.isArray(field.value) ? field.value : []}
                        onChange={field.onChange}
                        placeholder="Select available sizes"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed product description..."
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload up to 5 product images
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}