"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { getSmartReminder, type SmartReminderOutput } from "@/ai/flows/smart-reminders"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, Copy, Send } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  invoiceId: z.string().min(1, "Invoice ID is required"),
  invoiceAmount: z.coerce.number().positive("Amount must be positive"),
  daysPastDue: z.coerce.number().min(0, "Days must be 0 or more"),
  clientPaymentHistory: z.string().min(10, "Provide some context on payment history"),
})

export function ReminderForm() {
  const [reminder, setReminder] = useState<SmartReminderOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "ACME-001",
      invoiceId: "INV-2024-003",
      invoiceAmount: 350,
      daysPastDue: 15,
      clientPaymentHistory: "Usually pays on time, but has had one late payment in the past year. Generally a good client.",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setReminder(null)
    try {
      const result = await getSmartReminder(values)
      setReminder(result)
    } catch (error) {
      console.error("Error generating reminder:", error)
      toast({
        title: "Error",
        description: "Failed to generate reminder. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (reminder?.reminderMessage) {
      navigator.clipboard.writeText(reminder.reminderMessage)
      toast({
        title: "Copied!",
        description: "Reminder message copied to clipboard.",
      })
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Generate a Reminder</CardTitle>
          <CardDescription>Fill in the details below to generate a tailored reminder message.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="clientId" render={({ field }) => (
                  <FormItem><FormLabel>Client ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="invoiceId" render={({ field }) => (
                  <FormItem><FormLabel>Invoice ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="invoiceAmount" render={({ field }) => (
                  <FormItem><FormLabel>Invoice Amount ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="daysPastDue" render={({ field }) => (
                  <FormItem><FormLabel>Days Past Due</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="clientPaymentHistory" render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Payment History</FormLabel>
                  <FormControl><Textarea placeholder="e.g., Always pays on time, one previous late payment..." {...field} className="min-h-[100px]" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generate Reminder
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="min-h-[400px]">
        {isLoading && (
          <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Generating your smart reminder...</p>
              </CardContent>
          </Card>
        )}

        {reminder && !isLoading && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                      <CardTitle>Generated Reminder</CardTitle>
                      <CardDescription>AI-recommended reminder and message.</CardDescription>
                  </div>
                  <Badge variant={reminder.reminderType === 'firm' ? 'destructive' : 'default'} className="capitalize">{reminder.reminderType}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea readOnly value={reminder.reminderMessage} className="min-h-[225px] bg-muted/50" />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={copyToClipboard}><Copy className="mr-2 h-4 w-4" /> Copy Text</Button>
              <Button><Send className="mr-2 h-4 w-4" /> Send Reminder</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
