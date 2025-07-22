import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileSignature, Download } from 'lucide-react'

export default function ContractsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Contract Builder</h1>
            <p className="text-muted-foreground">Create reusable contracts for your clients.</p>
        </div>
        <Button variant="outline">
            <FileSignature className="mr-2 h-4 w-4"/>
            Load Template
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contract Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start writing your contract here... You can use placeholders like {{client_name}} or {{project_scope}}."
                className="min-h-[60vh] font-mono text-sm"
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Supports Digital Signatures</p>
              <div className="flex gap-2">
                <Button variant="outline">Save Template</Button>
                <Button>Send for Signature</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Contract Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="contractTitle">Contract Title</Label>
                        <Input id="contractTitle" placeholder="e.g. Web Design Agreement" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="clientName">Client Name</Label>
                        <Input id="clientName" placeholder="Client's Full Name" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Legal Templates</CardTitle>
                    <CardDescription>Per-use professional templates</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <Button variant="ghost" className="justify-between">
                        <span>Standard Service Agreement</span>
                        <span>$2 <Download className="inline-block ml-2 h-4 w-4"/></span>
                    </Button>
                    <Button variant="ghost" className="justify-between">
                        <span>Non-Disclosure Agreement</span>
                        <span>$2 <Download className="inline-block ml-2 h-4 w-4"/></span>
                    </Button>
                    <Button variant="ghost" className="justify-between">
                        <span>Retainer Agreement</span>
                        <span>$2 <Download className="inline-block ml-2 h-4 w-4"/></span>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
