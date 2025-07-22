import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const clients = [
  { name: 'Acme Inc.', email: 'contact@acme.com', avatar: 'A', initials: 'AI' },
  { name: 'Stark Industries', email: 'pepper@stark.com', avatar: 'S', initials: 'SI' },
  { name: 'Wayne Enterprises', email: 'lucius@wayne.com', avatar: 'W', initials: 'WE' },
  { name: 'Gekko & Co.', email: 'gordon@gekko.co', avatar: 'G', initials: 'GC' },
];

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Clients</h1>
            <p className="text-muted-foreground">Manage your client profiles and engagement.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4"/>
            Add Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client) => (
          <Card key={client.email}>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40" alt={client.name} data-ai-hint="logo abstract" />
                    <AvatarFallback>{client.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle>{client.name}</CardTitle>
                    <CardDescription>{client.email}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Last engagement: 3 days ago.
                    <br />
                    2 active projects.
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
