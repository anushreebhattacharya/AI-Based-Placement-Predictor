import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BrainCircuit,
  ChartNoAxesCombined,
  History,
  User,
  Menu,
} from "lucide-react";

import Logo from "../assets/Logo.jpg";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Predict Placement",
      path: "/prediction",
      icon: BrainCircuit,
    },
    {
      name: "Gap Analyzer",
      path: "/gap-analyzer",
      icon: ChartNoAxesCombined,
    },
    {
      name: "History",
      path: "/history",
      icon: History,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0F2A35] text-white shadow-xl">

      {/* Logo Section */}
      <div className="h-24 px-5 flex items-center justify-between border-b border-white/10">

        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Placement Predictor Logo"
            className="w-11 h-11 object-contain rounded-lg"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold">
              Placement
            </span>
            <span className="text-lg font-semibold">
              Predictor
            </span>
          </div>
        </div>

        <Menu size={21} className="text-gray-300" />
      </div>

      {/* Navigation */}
      <nav className="px-3 py-8 space-y-3">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#0D9488] text-white shadow-md"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={22} strokeWidth={2} />

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
};

export default Sidebar;