import { ReminderForm } from "./ReminderForm"
import { Lightbulb } from "lucide-react"

export default function SmartRemindersPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Smart Reminders</h1>
                <p className="text-muted-foreground">
                    Use AI to generate optimized invoice reminders based on client history.
                </p>
            </div>

            <div className="bg-accent/10 border-l-4 border-accent text-accent-foreground p-4 rounded-r-lg flex gap-4 items-start">
                <Lightbulb className="h-6 w-6 mt-1 text-accent shrink-0" />
                <div>
                    <h3 className="font-semibold text-accent-foreground/90">How it works</h3>
                    <p className="text-sm text-accent-foreground/80">
                        Our AI analyzes the client's payment history and how overdue the invoice is to recommend the best reminder tone—either friendly or firm. It then drafts a message for you, increasing the chances of timely payment.
                    </p>
                </div>
            </div>

            <ReminderForm />
        </div>
    )
}
