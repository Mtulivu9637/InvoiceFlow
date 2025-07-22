import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'For freelancers just starting out.',
    features: ['2 invoices/month', 'Basic invoice templates', 'Email support'],
    cta: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$10',
    description: 'For professionals managing multiple clients.',
    features: [
      'Unlimited invoices & contracts',
      'Digital signature support',
      'Smart reminders',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    isPopular: true,
  },
  {
    name: 'Agency',
    price: '$25',
    description: 'For teams and agencies with advanced needs.',
    features: [
      'All Pro features',
      'Team access (up to 5 users)',
      'Export data options',
      'Advanced CRM features',
    ],
    cta: 'Contact Sales',
    isPopular: false,
  },
]

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center font-headline">Flexible Plans for Everyone</h1>
        <p className="text-muted-foreground text-center mt-2 max-w-2xl mx-auto">
          Choose the plan that's right for you. All plans come with our core features, but our paid tiers unlock powerful tools to save you time and money.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.isPopular ? 'border-primary shadow-lg ring-1 ring-primary' : ''}`}>
            <CardHeader>
              {tier.isPopular && (
                <div className="text-center text-primary font-semibold mb-2">Most Popular</div>
              )}
              <CardTitle className="text-center">{tier.name}</CardTitle>
              <div className="text-center">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <CardDescription className="text-center min-h-[40px] pt-2">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.isPopular ? 'default' : 'outline'}>{tier.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
