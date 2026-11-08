import { useMemo, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  Wallet,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'

type Section = 'Overview' | 'Transactions' | 'Budgets' | 'Goals'
type Transaction = {
  id: number
  name: string
  category: string
  date: string
  amount: number
  initials: string
  color: string
}

const initialTransactions: Transaction[] = [
  { id: 1, name: 'Whole Foods Market', category: 'Groceries', date: 'Today, 10:42 AM', amount: -86.42, initials: 'W', color: 'mint' },
  { id: 2, name: 'Notion Labs', category: 'Software', date: 'Today, 9:18 AM', amount: -10, initials: 'N', color: 'ink' },
  { id: 3, name: 'Studio North', category: 'Freelance', date: 'Yesterday', amount: 1250, initials: 'S', color: 'peach' },
  { id: 4, name: 'Blue Bottle Coffee', category: 'Dining', date: 'Yesterday', amount: -7.5, initials: 'B', color: 'blue' },
]

const cashflow = [
  { day: '1', income: 680, spending: 390 },
  { day: '3', income: 880, spending: 520 },
  { day: '5', income: 720, spending: 430 },
  { day: '7', income: 1200, spending: 710 },
  { day: '9', income: 790, spending: 480 },
  { day: '11', income: 980, spending: 620 },
  { day: '13', income: 760, spending: 450 },
  { day: '15', income: 1420, spending: 810 },
  { day: '17', income: 950, spending: 590 },
  { day: '19', income: 1100, spending: 690 },
  { day: '21', income: 850, spending: 520 },
  { day: '23', income: 1320, spending: 760 },
  { day: '25', income: 920, spending: 610 },
  { day: '27', income: 1180, spending: 720 },
  { day: '30', income: 1480, spending: 830 },
]

const budgets = [
  { name: 'Groceries', spent: 384, limit: 500, color: 'green', icon: 'G' },
  { name: 'Dining out', spent: 248, limit: 350, color: 'coral', icon: 'D' },
  { name: 'Transport', spent: 96, limit: 180, color: 'blue', icon: 'T' },
]

const goals = [
  { name: 'Japan trip', saved: 2840, target: 5000, date: 'Sep 2026', color: 'green' },
  { name: 'Rainy day fund', saved: 7200, target: 10000, date: 'Dec 2026', color: 'coral' },
]

const currency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(Math.abs(amount))

function App() {
  const [section, setSection] = useState<Section>('Overview')
  const [transactions, setTransactions] = useState(initialTransactions)
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  const filteredTransactions = useMemo(
    () => transactions.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase())),
    [transactions, query],
  )

  const addTransaction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const amount = Number(formData.get('amount'))
    const name = String(formData.get('name')).trim()
    const category = String(formData.get('category'))
    if (!name || !Number.isFinite(amount) || amount <= 0) return
    setTransactions((current) => [{
      id: Date.now(), name, category, date: 'Just now', amount: -amount,
      initials: name.charAt(0).toUpperCase(), color: 'mint',
    }, ...current])
    setShowForm(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#overview" onClick={() => setSection('Overview')}>
          <span className="brand-mark"><span /></span>
          <span>fintrack<span className="brand-ai">.ai</span></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={section === 'Overview'} onClick={() => { setSection('Overview'); setMobileNav(false) }} />
          <NavItem icon={<CreditCard size={18} />} label="Transactions" active={section === 'Transactions'} onClick={() => { setSection('Transactions'); setMobileNav(false) }} />
          <NavItem icon={<Wallet size={18} />} label="Budgets" active={section === 'Budgets'} onClick={() => { setSection('Budgets'); setMobileNav(false) }} />
          <NavItem icon={<Target size={18} />} label="Goals" active={section === 'Goals'} onClick={() => { setSection('Goals'); setMobileNav(false) }} />
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-icon"><Sparkles size={16} /></div>
            <p>Your money, getting smarter.</p>
            <span>Personal insights are ready when you are.</span>
            <button type="button" onClick={() => setSection('Overview')}>Explore insights <ArrowUpRight size={14} /></button>
          </div>
          <button className="profile" type="button">
            <span className="avatar">JD</span>
            <span className="profile-copy"><strong>Jordan Davis</strong><small>Personal account</small></span>
            <ChevronDown size={16} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(!mobileNav)}><Menu size={19} /></button>
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{section}</strong></div>
          <div className="top-actions">
            <button className="icon-button help-button" aria-label="Help"><CircleHelp size={18} /></button>
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <span className="top-divider" />
            <button className="date-select">May 2026 <ChevronDown size={15} /></button>
          </div>
        </header>

        <div className="page-content">
          {section === 'Overview' && <Overview transactions={transactions} onAdd={() => setShowForm(true)} onViewAll={() => setSection('Transactions')} />}
          {section === 'Transactions' && <TransactionsPage transactions={filteredTransactions} query={query} onQuery={setQuery} onAdd={() => setShowForm(true)} />}
          {section === 'Budgets' && <BudgetsPage />}
          {section === 'Goals' && <GoalsPage />}
        </div>
      </main>

      {mobileNav && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
      {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}>
        <form className="transaction-modal" onSubmit={addTransaction} onClick={(event) => event.stopPropagation()}>
          <div className="modal-heading"><div><span className="eyebrow">NEW ENTRY</span><h2>Add a transaction</h2></div><button type="button" className="icon-button" aria-label="Close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
          <label>Description<input name="name" placeholder="e.g. Grocery store" required autoFocus /></label>
          <div className="form-row"><label>Amount<input name="amount" type="number" min="0.01" step="0.01" placeholder="0.00" required /></label><label>Category<select name="category"><option>Groceries</option><option>Dining</option><option>Transport</option><option>Shopping</option><option>Other</option></select></label></div>
          <div className="modal-actions"><button type="button" className="button-quiet" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="button-primary">Add transaction <Plus size={16} /></button></div>
        </form>
      </div>}
    </div>
  )
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: Section; active: boolean; onClick: () => void }) {
  return <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>{icon}<span>{label}</span>{label === 'Transactions' && <span className="nav-count">12</span>}</button>
}

function Overview({ transactions, onAdd, onViewAll }: { transactions: Transaction[]; onAdd: () => void; onViewAll: () => void }) {
  return <>
    <div className="page-heading">
      <div><span className="eyebrow">SUNDAY, MAY 24, 2026</span><h1>Your money, in focus.</h1><p>Here's what's happening with your finances.</p></div>
      <button className="button-primary" onClick={onAdd}><Plus size={17} /> Add transaction</button>
    </div>

    <section className="summary-grid" aria-label="Monthly summary">
      <SummaryCard label="Total balance" amount="$24,680.50" change="↑ 4.8%" note="vs. last month" icon={<Wallet size={18} />} tone="balance" />
      <SummaryCard label="Income this month" amount="$6,240.00" change="↑ 12.2%" note="vs. last month" icon={<ArrowDownLeft size={18} />} tone="income" />
      <SummaryCard label="Spent this month" amount="$2,845.32" change="↓ 8.1%" note="vs. last month" icon={<ArrowUpRight size={18} />} tone="spending" />
    </section>

    <section className="content-grid">
      <div className="panel cashflow-panel">
        <div className="panel-heading"><div><span className="eyebrow">YOUR ACTIVITY</span><h2>Cash flow</h2></div><button className="select-button">This month <ChevronDown size={14} /></button></div>
        <div className="chart-legend"><span><i className="legend-income" /> Income <strong>$6,240</strong></span><span><i className="legend-spending" /> Spending <strong>$2,845</strong></span></div>
        <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={cashflow} margin={{ top: 8, right: 3, left: -20, bottom: 0 }}>
          <defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b8067" stopOpacity={0.19} /><stop offset="100%" stopColor="#3b8067" stopOpacity={0} /></linearGradient><linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ee9478" stopOpacity={0.15} /><stop offset="100%" stopColor="#ee9478" stopOpacity={0} /></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#e9ede8" strokeDasharray="3 5" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9aa39b', fontSize: 11 }} tickMargin={12} />
          <Tooltip contentStyle={{ border: '1px solid #e8ece7', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 12 }} formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} labelFormatter={(label) => `May ${label}`} />
          <Area type="monotone" dataKey="income" stroke="#3b8067" strokeWidth={2.5} fill="url(#incomeFill)" />
          <Area type="monotone" dataKey="spending" stroke="#e68c70" strokeWidth={2} fill="url(#spendingFill)" />
        </AreaChart></ResponsiveContainer></div>
        <div className="chart-footnote"><span>Daily income & spending</span><span>USD <ChevronDown size={12} /></span></div>
      </div>

      <div className="insight-panel">
        <div className="insight-top"><span className="insight-star"><Sparkles size={16} /></span><span>FINTRACK INSIGHT</span><span className="insight-live">NEW</span></div>
        <h2>Small wins add up.</h2>
        <p>Your dining spend is down <strong>18%</strong> this month. Keep it up and you'll have an extra <strong>$420</strong> for your Japan trip by September.</p>
        <div className="insight-progress"><div className="progress-label"><span>Japan trip goal</span><strong>$2,840 <small>/ $5,000</small></strong></div><div className="progress-track"><i style={{ width: '57%' }} /></div><div className="progress-foot"><span>57% there</span><span>Sep 2026</span></div></div>
        <button className="insight-link">See your goals <ArrowUpRight size={15} /></button>
        <div className="insight-decoration"><span /><span /><span /></div>
      </div>
    </section>

    <section className="panel transactions-panel">
      <div className="panel-heading transaction-heading"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Transactions</h2></div><button className="text-button" onClick={onViewAll}>View all <ArrowUpRight size={15} /></button></div>
      <TransactionList transactions={transactions.slice(0, 4)} />
    </section>
    <footer className="page-footer"><span>FinTrack AI <span className="footer-dot">·</span> Your finances, thoughtfully tracked.</span><button><Settings2 size={14} /> Preferences</button></footer>
  </>
}

function SummaryCard({ label, amount, change, note, icon, tone }: { label: string; amount: string; change: string; note: string; icon: React.ReactNode; tone: string }) {
  return <div className="summary-card"><div className="summary-top"><span>{label}</span><span className={`summary-icon ${tone}`}>{icon}</span></div><div className="summary-amount">{amount}</div><div className="summary-change"><strong>{change}</strong><span>{note}</span></div></div>
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return <div className="transaction-list">{transactions.map((transaction) => <div className="transaction-row" key={transaction.id}>
    <span className={`merchant-mark ${transaction.color}`}>{transaction.initials}</span><span className="transaction-name"><strong>{transaction.name}</strong><small>{transaction.category}</small></span><span className="transaction-date">{transaction.date}</span><strong className={`transaction-amount ${transaction.amount > 0 ? 'positive' : ''}`}>{transaction.amount > 0 ? '+' : '-'}{currency(transaction.amount)}</strong>
  </div>)}</div>
}

function TransactionsPage({ transactions, query, onQuery, onAdd }: { transactions: Transaction[]; query: string; onQuery: (value: string) => void; onAdd: () => void }) {
  return <>
    <div className="page-heading"><div><span className="eyebrow">ALL ACTIVITY</span><h1>Transactions</h1><p>Every dollar, accounted for.</p></div><button className="button-primary" onClick={onAdd}><Plus size={17} /> Add transaction</button></div>
    <section className="panel transactions-panel full-transactions"><div className="list-toolbar"><div className="search-box"><Search size={16} /><input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search transactions" /></div><button className="select-button">All categories <ChevronDown size={14} /></button></div><TransactionList transactions={transactions} />{transactions.length === 0 && <p className="empty-state">No transactions match your search.</p>}</section>
  </>
}

function BudgetsPage() {
  return <><div className="page-heading"><div><span className="eyebrow">PLAN WITH INTENTION</span><h1>Your budgets.</h1><p>May spending at a glance.</p></div><button className="button-primary"><Plus size={17} /> Create budget</button></div><section className="budget-grid">{budgets.map((budget) => <article className="panel budget-card" key={budget.name}><div className="budget-card-top"><span className={`budget-icon ${budget.color}`}>{budget.icon}</span><button className="icon-button" aria-label={`Options for ${budget.name}`}><Settings2 size={16} /></button></div><span className="eyebrow">MONTHLY BUDGET</span><h2>{budget.name}</h2><div className="budget-total"><strong>{currency(budget.spent)}</strong><span>of {currency(budget.limit)}</span></div><div className="progress-track"><i className={budget.color} style={{ width: `${Math.min(budget.spent / budget.limit * 100, 100)}%` }} /></div><div className="progress-foot"><span>{Math.round(budget.spent / budget.limit * 100)}% used</span><span>{currency(budget.limit - budget.spent)} left</span></div></article>)}</section></>
}

function GoalsPage() {
  return <><div className="page-heading"><div><span className="eyebrow">THE BIGGER PICTURE</span><h1>Goals in motion.</h1><p>Good things take a little planning.</p></div><button className="button-primary"><Plus size={17} /> New goal</button></div><section className="goals-grid">{goals.map((goal) => <article className="panel goal-card" key={goal.name}><div className={`goal-symbol ${goal.color}`}><Target size={21} /></div><span className="eyebrow">TARGET {goal.date.toUpperCase()}</span><h2>{goal.name}</h2><div className="goal-total"><strong>{currency(goal.saved)}</strong><span>of {currency(goal.target)}</span></div><div className="progress-track"><i className={goal.color} style={{ width: `${goal.saved / goal.target * 100}%` }} /></div><div className="progress-foot"><span>{Math.round(goal.saved / goal.target * 100)}% complete</span><span>{currency(goal.target - goal.saved)} to go</span></div></article>)}</section></>
}

export default App