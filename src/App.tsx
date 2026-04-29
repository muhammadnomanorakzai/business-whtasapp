/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, Home, ShoppingCart, MessageSquare, Users, Settings, 
  Calendar, PlusCircle, MessageCircle, ShoppingBag, Bot, 
  Banknote, MoreVertical, Search, Bell, HelpCircle, 
  Tag, Pause, TrendingUp, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { cn } from './lib/utils';

// --- Types & Mock Data ---

interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  initials: string;
  details: string;
  time: string;
  amount: string;
  status: 'Pending' | 'Processing' | 'Complete';
}

const ORDERS: Order[] = [
  { id: '1', customerName: 'Ahmed Sheikh', phoneNumber: '+92 300 1234567', initials: 'AS', details: '2x Large T-Shirt (White)', time: '10:45 AM', amount: 'Rs. 2,400', status: 'Pending' },
  { id: '2', customerName: 'Mariam Khan', phoneNumber: '+92 321 9876543', initials: 'MK', details: '1x Premium Hoodie', time: '09:12 AM', amount: 'Rs. 4,500', status: 'Processing' },
  { id: '3', customerName: 'Zaid Uzair', phoneNumber: '+92 345 5551234', initials: 'ZU', details: '3x Cotton Polo Shirts', time: 'Yesterday', amount: 'Rs. 5,100', status: 'Complete' },
  { id: '4', customerName: 'Fatima Raza', phoneNumber: '+92 311 0002222', initials: 'FR', details: '1x Denim Jacket', time: 'Yesterday', amount: 'Rs. 3,800', status: 'Complete' },
];

const FEED_ITEMS = [
  { id: 1, type: 'bot', text: 'Auto-replied to 0300-XXXXXXX regarding \'Price\'', time: '2 minutes ago', icon: <Bot size={16} />, color: 'bg-emerald-100 text-emerald-600' },
  { id: 2, type: 'order', text: 'New Order captured from 0321-XXXXXXX', time: '15 minutes ago', icon: <ShoppingCart size={16} />, color: 'bg-blue-100 text-blue-600' },
  { id: 3, type: 'tag', text: 'New Lead tagged: HOT PROSPECT', time: '45 minutes ago', icon: <Tag size={16} />, color: 'bg-amber-100 text-amber-600', badge: 'HOT PROSPECT' },
  { id: 4, type: 'bot', text: 'Auto-replied to 0345-XXXXXXX regarding \'Address\'', time: '1 hour ago', icon: <Bot size={16} />, color: 'bg-emerald-100 text-emerald-600' },
];

const PERFORMANCE_DATA = [
  { day: 'MON', value: 120 },
  { day: 'TUE', value: 210 },
  { day: 'WED', value: 180 },
  { day: 'THU', value: 340, active: true },
  { day: 'FRI', value: 200 },
  { day: 'SAT', value: 150 },
  { day: 'SUN', value: 280 },
];

// --- Components ---

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Customers', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[80px] border-r border-outline bg-surface-dim flex flex-col items-center py-10 z-50 transition-all duration-300">
      <div className="mb-12">
        <Zap className="text-primary fill-current" size={32} />
      </div>
      
      <nav className="flex-1 space-y-8">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "p-3 transition-all duration-200 relative group",
                isActive 
                  ? "text-primary" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
              title={item.name}
            >
              <item.icon size={24} />
              {isActive && (
                <motion.div 
                  layoutId="active-dot"
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="font-black text-2xl tracking-tighter">V</div>
      </div>
    </aside>
  );
};

const Header = () => (
  <header className="sticky top-0 z-40 w-full border-b border-outline bg-surface/50 backdrop-blur-xl">
    <div className="flex items-center justify-between px-10 h-20 ml-[80px] w-full">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={18} />
          <input 
            className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-outline hover:border-outline-variant focus:border-primary text-sm uppercase tracking-widest outline-none transition-all placeholder:text-on-surface-variant/30" 
            placeholder="SYSTEM SEARCH..." 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 ml-6">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <HelpCircle size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 pl-4 border-l border-outline">
          <div className="text-right">
            <p className="text-sm font-black text-on-surface leading-none uppercase italic">ROOT_ADMIN</p>
            <p className="text-[10px] text-primary mt-1 font-bold tracking-widest uppercase">SYSLOG_AUTH</p>
          </div>
          <div className="w-10 h-10 bg-outline rounded-sm overflow-hidden border border-outline-variant">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover grayscale contrast-125" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCove_hOe1oKvD_qGVUh0WZfdKHV67DD_wLOjxvP_OzOnb-pgdK_ibk0QotidohXROLoexWAqvzCc6z3P531HwTwnIc7eRbipjEHcRHaGpDeP8-4TSxEIPLEY0vd4mj3c9fbKawx61jpHigsLbCpr10SxWU_6I7sbIv4falacRfIrYtMwPRISNBz4C8Xpl7v0-mX7vXXn6jp0wAljVY8boxnBTcQT0MHSeDcOWfeXdgor6kaQ9gnQVTionseEeokUwFF7bqrYHFsMc"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const StatCard = ({ label, value, trend, trendLabel, highlight }: any) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="bg-surface-dim p-8 border-l-4 border-outline hover:border-primary transition-all group"
  >
    <span className="micro-label">{label}</span>
    <div className="metric-value mb-2">
      {value} 
      {highlight && <span className="text-xl text-primary ml-2 italic">{highlight}</span>}
    </div>
    {trend && (
      <div className="text-[12px] font-bold text-primary mb-1">{trend} INCREASE</div>
    )}
    {trendLabel && (
      <p className="text-[10px] text-on-surface-variant font-medium tracking-widest">{trendLabel}</p>
    )}
  </motion.div>
);

export default function App() {
  const [currentTime] = useState("SYSLOG.EVENT_ID.2023.10.24");

  return (
    <div className="min-h-screen flex bg-surface selection:bg-primary selection:text-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="ml-[80px] p-12 max-w-[1440px] w-full mx-auto">
          {/* Dashboard Header */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="micro-label">OmniCRM System v4.2</span>
              <h1 className="display-title">
                PURE<br/><span className="accent-text">THRU-PUT</span>
              </h1>
              <p className="text-on-surface-variant flex items-center gap-2 mt-6 font-mono text-xs tracking-tighter">
                <Clock size={12} />
                {currentTime} // CONNECTION_STABLE
              </p>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-black px-10 py-5 font-black uppercase text-sm tracking-widest hover:brightness-110 transition-all"
            >
              INITIATE BROADCAST
            </motion.button>
          </section>

          {/* Stat Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-20 border-y border-outline">
            <StatCard 
              label="Cycle Volume" 
              value="432" 
              trend="+12%" 
            />
            <StatCard 
              label="Ingest Nodes" 
              value="24" 
              trend="+5%" 
            />
            <StatCard 
              label="Bot Automation" 
              value="380" 
              highlight="OBJ.400"
              trendLabel="Efficiency Optimised" 
            />
            <StatCard 
              label="Net Revenue" 
              value="45K" 
              highlight="PKR"
            />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Recent Orders Table */}
            <section className="lg:col-span-2">
              <div className="mb-10 flex justify-between items-end border-b border-outline pb-4">
                <div>
                  <span className="micro-label">Data Log</span>
                  <h2 className="text-3xl font-black italic">Recent Operations</h2>
                </div>
                <button className="text-primary text-xs font-black tracking-widest hover:underline px-4 py-2 border border-outline">VIEW_ALL_LOGS</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-outline-variant">
                    <tr>
                      <th className="px-4 py-6 micro-label !mb-0">Entity</th>
                      <th className="px-4 py-6 micro-label !mb-0">Payload</th>
                      <th className="px-4 py-6 micro-label !mb-0">Timestamp</th>
                      <th className="px-4 py-6 micro-label !mb-0">Value</th>
                      <th className="px-4 py-6 micro-label !mb-0">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline">
                    {ORDERS.map((order, index) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={order.id} 
                        className="hover:bg-primary/5 transition-colors group"
                      >
                        <td className="px-4 py-8">
                          <p className="text-sm font-black italic">{order.customerName}</p>
                          <p className="text-[10px] text-primary font-bold mt-1 tracking-tighter">{order.phoneNumber}</p>
                        </td>
                        <td className="px-4 py-8">
                          <p className="text-xs text-on-surface-variant font-mono">{order.details}</p>
                        </td>
                        <td className="px-4 py-8">
                          <p className="text-[10px] font-bold text-on-surface-variant/40">{order.time}</p>
                        </td>
                        <td className="px-4 py-8">
                          <p className="text-sm font-black text-primary">{order.amount.split('.')[1] || order.amount}</p>
                        </td>
                        <td className="px-4 py-8">
                          <span className={cn(
                            "px-3 py-1 text-[10px] font-black border",
                            order.status === 'Pending' && "border-yellow-900 text-yellow-500",
                            order.status === 'Processing' && "border-blue-900 text-blue-500",
                            order.status === 'Complete' && "border-primary/50 text-primary"
                          )}>
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Live Automation Feed */}
            <section className="flex flex-col">
              <div className="mb-10 border-b border-outline pb-4 flex justify-between items-center">
                <div>
                  <span className="micro-label">Real-Time Ingest</span>
                  <h2 className="text-3xl font-black italic">Pulse Feed</h2>
                </div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              <div className="flex-1 space-y-10">
                {FEED_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-6 border-l border-outline pl-6 hover:border-primary transition-all">
                    <div className="text-primary mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-relaxed tracking-tight group">
                        {item.text.toUpperCase()}
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-black mt-2 tracking-[0.2em]">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-12 py-5 border border-outline font-black text-xs tracking-[0.3em] hover:bg-surface-dim transition-all">
                DUMP_ALL_LOGS
              </button>
            </section>
          </div>

          {/* Secondary Stats/Analytics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20 border-t border-outline pt-20">
            {/* Performance Over Time */}
            <section>
              <div className="mb-10">
                <span className="micro-label">Analytics Node</span>
                <h4 className="text-4xl font-black uppercase italic tracking-tighter">System Load</h4>
              </div>
              
              <div className="h-64 w-full border-b border-outline">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#333' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(223, 255, 0, 0.05)' }} 
                      contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', borderRadius: '0', fontSize: '10px', color: '#DFFF00' }}
                    />
                    <Bar dataKey="value" radius={0} barSize={60}>
                      {PERFORMANCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.active ? '#DFFF00' : '#111'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 flex justify-between text-[10px] font-black text-on-surface-variant tracking-widest">
                <span>00:00HRS</span>
                <span>SYNC_OPTIMISED</span>
                <span>24:00HRS</span>
              </div>
            </section>

            {/* Campaign Snapshot */}
            <section className="bg-surface-dim p-10 border border-outline relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
              
              <span className="micro-label">Instruction Set</span>
              <h4 className="text-4xl font-black uppercase italic tracking-tighter mb-10">Active_Sequence</h4>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="metric-value text-3xl mb-1">92<span className="text-primary text-xl">%</span></div>
                  <span className="micro-label !text-[8px]">Open_Rate</span>
                  <div className="w-full bg-outline h-1 mt-4">
                    <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="bg-primary h-full" />
                  </div>
                </div>

                <div>
                  <div className="metric-value text-3xl mb-1">18.4<span className="text-primary text-xl">%</span></div>
                  <span className="micro-label !text-[8px]">Conv_Rate</span>
                  <div className="w-full bg-outline h-1 mt-4">
                    <motion.div initial={{ width: 0 }} animate={{ width: '18.4%' }} className="bg-primary h-full" />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button className="flex-1 py-5 bg-primary text-black font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all">
                  SCALE_COMMAND
                </button>
                <button className="px-6 py-5 border border-outline text-on-surface-variant hover:text-primary transition-all">
                  <Pause size={20} />
                </button>
              </div>
              <div className="mt-6 text-center text-[9px] font-bold text-on-surface-variant tracking-[0.4em]">
                LAST_SYNC: 0.2s_AGO
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
