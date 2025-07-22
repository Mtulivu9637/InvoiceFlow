"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, PlusCircle, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function InvoicesPage() {
  const [invoiceDate, setInvoiceDate] = React.useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = React.useState<Date | undefined>();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Create Invoice</h1>
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>Fill in the details to create a new invoice.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" placeholder="Enter client name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input id="clientEmail" type="email" placeholder="Enter client email" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !invoiceDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {invoiceDate ? format(invoiceDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={invoiceDate} onSelect={setInvoiceDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-4">Line Items</h3>
            <div className="grid gap-4">
              <div className="hidden md:grid grid-cols-[1fr_100px_100px_100px_auto] items-center gap-4 text-sm text-muted-foreground">
                <Label>Description</Label>
                <Label className="text-center">Quantity</Label>
                <Label className="text-right">Price</Label>
                <Label className="text-right">Total</Label>
                <span/>
              </div>
              <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_100px_100px_100px_auto] items-center gap-4">
                <Input placeholder="Item description" />
                <Input type="number" placeholder="1" className="w-20 md:w-full text-center" />
                <Input type="number" placeholder="0.00" className="hidden md:block text-right"/>
                <div className="hidden md:block text-right font-medium">$0.00</div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
          <Separator />
          <div className="flex justify-end">
            <div className="grid w-full max-w-sm gap-2 text-right">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (0%):</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>$0.00</span>
                </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Generate Invoice</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
