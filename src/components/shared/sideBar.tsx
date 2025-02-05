'use client';
import React, { useState } from 'react';
import {
  Home,
  Settings,
  Users,
  ChartBar,
  Briefcase,
  ChevronRight,
  ChevronDown,
  X,
  Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import avatar from "@/utilities/images/avatars/avatar.jpg";
import Image from 'next/image';
import { THEMES } from './themes';
import { MenuItemProps, MenuItems } from './MenuItem';


const code_societe = "agl";


const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (subItems) {
      setIsOpen(!isOpen);
    }
  };


  
  return (
    <div>
      <div
        onClick={handleToggle}
        className="flex items-center justify-between hover:bg-blue-700 p-2 rounded cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${THEMES[code_societe]?.sidebar?.icon  }`}  />
          <span>{label}</span>
        </div>
        {subItems && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </div>

      {subItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
              className="pl-10 space-y-2 mt-2"
            >
              {subItems.map((subItem, index) => (
                <div
                  key={index}
                  className="hover:bg-blue-600 p-2 rounded"
                >
                  {subItem.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Sidebar: React.FC<{
  isOpen: boolean;
  toggleSidebar: () => void;
}> = ({ isOpen = true, toggleSidebar }) => {
  

  return (
    <aside
      className={`
        ${THEMES[code_societe]?.sidebar.background} 
        ${THEMES[code_societe]?.sidebar.text} 
        w-64 
        h-full 
        fixed 
        z-40 
        transition-transform 
        duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto
        pb-10
      `}
    >
      <div className="p-6">

        <div className="flex justify-between items-center mb-4 md:hidden">

          <button onClick={toggleSidebar} className="text-white">
            <X />
          </button>
        </div>
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={avatar}
              alt={`Thuran Junior`}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-2 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>



          <div className="text-center w-full px-2">
            <div className="text-sm font-bold">
              {`Thuran Junior`}
            </div>
            <div className="text-xs text-gray-400 mt-0">
              {`E-Junior.Kono@aglgroup.com`}
            </div>
          </div>

        </div>


        <nav>
          <ul className="space-y-2">
            {MenuItems.map((item, index) => (
              <li key={index}>
                <MenuItem {...item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;