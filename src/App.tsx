// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from 'react';
// import { HashRouter,
//  Routes, Route, useLocation, useNavigate
// } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Wallet, Grid, Clock, Settings, Moon, Sun, Menu, Plus, Copy, Pencil, ChevronLeft, Check } from 'lucide-react';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { motion, AnimatePresence } from 'framer-motion';
// import { isFirstTime } from './utils';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { ActivityContent, NFTsContent, SettingsContent, WalletContent } from '@/pages';
import Login from './pages/password';

export default function WalletApp() {
  return (
    // <HashRouter>
    //  <Component />
    <Login />
    // </HashRouter>
  );
}

// function Component() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [_IsSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [open, setOpen] = useState(false);

//   const [balance] = useState({ usd: 1234.56, sol: 12.5 });
//   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const activeTab = location.pathname.slice(1) || 'wallet';

//   const handleTabChange = (tab: string) => {
//     navigate(`/${tab}`);
//   };

//   const copyToClipboard = (text: string, index: number) => {
//     navigator.clipboard.writeText(text);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   const accountsw = [
//     {
//       name: 'Account 1',
//       image: '/placeholder.svg?height=40&width=40',
//       color: 'bg-green-500',
//       networks: [
//         { name: 'Solana', address: '5HSy...9kT5', icon: '☉' },
//         { name: 'Ethereum', address: '0x791E...7080', icon: 'Ξ' },
//         { name: 'Polygon', address: '0x791E...7080', icon: 'Ⓟ' },
//         { name: 'Bitcoin', address: 'bc1q...gqt8', icon: '₿' },
//       ],
//     },
//     {
//       name: 'Account 2',
//       image: '/placeholder.svg?height=40&width=40',
//       color: 'bg-purple-500',
//       networks: [
//         { name: 'Amoy', address: '0x639B...ce78', icon: 'Ⓟ' },
//         { name: 'Devnet', address: '3zyg...jGu', icon: 'Ξ' },
//       ],
//     },
//   ];

//   useEffect(() => {
//     isFirstTime();
//   }, []);

//   const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
//   const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
//   const accentColor = 'bg-red-500';
//   const secondaryBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';

//   return (
//     <div
//       className={`w-[360px] h-[600px] ${bgColor} ${textColor} flex flex-col overflow-hidden shadow-2xl font-sans relative`}
//     >
//       <header
//         className={`${accentColor} p-6 flex justify-between items-start rounded-b-3xl shadow-lg relative overflow-hidden`}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 opacity-50"></div>
//         <Sheet open={open} onOpenChange={setOpen}>
//           <SheetTrigger asChild>
//             <Button
//               variant="ghost"
//               className="text-white hover:bg-white/10 p-1 rounded-full transition-colors duration-300 z-10"
//               onClick={() => setIsSidebarOpen(true)}
//             >
//               <Menu className="h-6 w-6" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-[80px] sm:w-[80px] p-0">
//             <div className="flex flex-col h-full bg-zinc-900 text-white">
//               <Button variant="ghost" className="flex items-center justify-start p-4" onClick={() => setOpen(false)}>
//                 <ChevronLeft className="h-4 w-4 mr-2" />
//                 Back
//               </Button>
//               <div className="flex-1 overflow-auto py-2 no-scrollbar">
//                 {accountsw.map((account, index) => (
//                   <TooltipProvider key={account.name}>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div className="px-4 py-2 cursor-pointer">
//                           <Avatar className={`w-10 h-10 ${account.color}`}>
//                             <AvatarImage src={account.image} alt={account.name} />
//                             <AvatarFallback className="text-black">
//                               {index === 0 ? '✓' : `A${index + 1}`}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div className="mt-1 text-xs text-center">{account.name}</div>
//                         </div>
//                       </TooltipTrigger>
//                       <TooltipContent
//                         side="right"
//                         align="start"
//                         sideOffset={5}
//                         className="w-64 p-0 bg-[#1c1c1c] border-gray-700 text-white relative"
//                       >
//                         <motion.div
//                           className="absolute left-0 top-4 -ml-[9px] w-0 h-0 border-y-[8px] border-y-transparent border-r-[9px] border-r-[#1c1c1c]"
//                           initial={{ opacity: 0, scale: 0.5 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ duration: 0.2 }}
//                         />
//                         <motion.div
//                           className="p-4 space-y-4"
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <div className="flex justify-between items-center">
//                             <span className="text-sm font-medium">{account.name}</span>
//                             <span className="text-xs text-gray-400">$0.00</span>
//                           </div>
//                           {account.networks.map((network, networkIndex) => (
//                             <motion.div
//                               key={network.name}
//                               className="flex items-center justify-between"
//                               onHoverStart={() => setHoveredIndex(networkIndex)}
//                               onHoverEnd={() => setHoveredIndex(null)}
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <div className="flex items-center space-x-2">
//                                 <span className="text-lg">{network.icon}</span>
//                                 <motion.span
//                                   className={`text-sm ${hoveredIndex === networkIndex ? 'text-primary' : 'text-white'}`}
//                                   animate={{ color: hoveredIndex === networkIndex ? '#10b981' : '#ffffff' }}
//                                 >
//                                   {network.name}
//                                 </motion.span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <motion.span
//                                   className={`text-xs ${hoveredIndex === networkIndex ? 'text-primary' : 'text-gray-400'}`}
//                                   animate={{ color: hoveredIndex === networkIndex ? '#10b981' : '#9ca3af' }}
//                                 >
//                                   {network.address}
//                                 </motion.span>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   className="h-6 w-6 hover:bg-transparent"
//                                   onClick={() => copyToClipboard(network.address, networkIndex)}
//                                 >
//                                   <motion.div
//                                     initial={false}
//                                     animate={{ scale: copiedIndex === networkIndex ? [1, 1.2, 1] : 1 }}
//                                     transition={{ duration: 0.2 }}
//                                   >
//                                     {copiedIndex === networkIndex ? (
//                                       <Check className="h-3 w-3 text-green-500" />
//                                     ) : (
//                                       <Copy className="h-3 w-3 text-gray-400" />
//                                     )}
//                                   </motion.div>
//                                 </Button>
//                               </div>
//                             </motion.div>
//                           ))}
//                         </motion.div>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 ))}
//               </div>
//               <div className="p-4 flex flex-col space-y-2">
//                 <Button variant="ghost" size="sm" className="w-full justify-start">
//                   <Plus className="h-4 w-6" />
//                 </Button>
//                 <Button variant="ghost" size="sm" className="w-full justify-start">
//                   <Pencil className="h-4 w-6" />
//                 </Button>
//                 <Button variant="ghost" size="sm" className="w-full justify-start">
//                   <Settings className="h-4 w-6" />
//                 </Button>
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//         <motion.div
//           className="text-center z-10"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-4xl font-bold text-white">${balance.usd.toFixed(2)}</h2>
//           <p className="text-sm text-red-100 mt-1">{balance.sol.toFixed(2)} SOL</p>
//         </motion.div>
//         <Button
//           variant="ghost"
//           size="icon"
//           className="text-white hover:bg-white/10 rounded-full transition-colors duration-300 z-10"
//           onClick={() => setIsDarkMode(!isDarkMode)}
//         >
//           {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//         </Button>
//       </header>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//           className={`flex-1 overflow-hidden flex flex-col ${bgColor}`}
//         >
//           <ScrollArea className="flex-1 px-4">
//             <Routes>
//               <Route path="/" element={<WalletContent balance={balance} isDarkMode={isDarkMode} />} />
//               <Route path="/wallet" element={<WalletContent balance={balance} isDarkMode={isDarkMode} />} />
//               <Route path="/nfts" element={<NFTsContent isDarkMode={isDarkMode} />} />
//               <Route path="/activity" element={<ActivityContent isDarkMode={isDarkMode} />} />
//               <Route path="/settings" element={<SettingsContent isDarkMode={isDarkMode} />} />
//             </Routes>
//           </ScrollArea>
//         </motion.div>
//       </AnimatePresence>

//       <nav
//         className={`${secondaryBgColor} border-t ${
//           isDarkMode ? 'border-gray-700' : 'border-gray-200'
//         } flex justify-around py-3 rounded-t-3xl shadow-lg`}
//       >
//         <NavButton
//           icon={<Wallet />}
//           label="Wallet"
//           isActive={activeTab === 'wallet'}
//           onClick={() => handleTabChange('wallet')}
//           isDarkMode={isDarkMode}
//         />
//         <NavButton
//           icon={<Grid />}
//           label="NFTs"
//           isActive={activeTab === 'nfts'}
//           onClick={() => handleTabChange('nfts')}
//           isDarkMode={isDarkMode}
//         />
//         <NavButton
//           icon={<Clock />}
//           label="Activity"
//           isActive={activeTab === 'activity'}
//           onClick={() => handleTabChange('activity')}
//           isDarkMode={isDarkMode}
//         />
//         <NavButton
//           icon={<Settings />}
//           label="Settings"
//           isActive={activeTab === 'settings'}
//           onClick={() => handleTabChange('settings')}
//           isDarkMode={isDarkMode}
//         />
//       </nav>
//     </div>
//   );
// }

// function NavButton({ icon, label, isActive, onClick, isDarkMode }: any) {
//   return (
//     <Button
//       variant="ghost"
//       size="sm"
//       className={`flex flex-col items-center justify-center h-14 w-14 rounded-lg transition-all duration-300 ${
//         isActive
//           ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} scale-110`
//           : isDarkMode
//             ? 'text-gray-400 hover:text-black'
//             : 'text-gray-500 hover:text-gray-900'
//       }`}
//       onClick={onClick}
//     >
//       {icon}
//       <span className="text-xs mt-1">{label}</span>
//     </Button>
//   );
// }
