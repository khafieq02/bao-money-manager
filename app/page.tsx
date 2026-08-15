import { AIFinancialBrief, BalanceCard, BudgetAlert, FinancialSummary, MonthlyOverview, RecentTransactions } from "@/components/dashboard";
import { PageShell } from "@/components/page-shell";
export default function HomePage() { return <PageShell><div className="mx-auto max-w-[620px] space-y-4"><BalanceCard/><FinancialSummary/><BudgetAlert/><AIFinancialBrief/><div className="grid gap-4 lg:grid-cols-2"><MonthlyOverview/><RecentTransactions/></div></div></PageShell>; }
