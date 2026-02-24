import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  X,
  Shield,
  Truck,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItemsOne = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Shipments",
      icon: <Truck size={20} />,
      path: "/dashboard/shipments",
    },
    {
      name: "Blockchain Ledger",
      icon: <img src="/images/icons/wallet-main.svg" alt="Ledger" className="custom-icon" />,
      path: "/dashboard/blockchain-ledger",
    },
    {
      name: "Settlements",
      icon: <img src="/images/icons/cash-main.svg" alt="Settlements" className="custom-icon" />,
      path: "/dashboard/settlements",
    },
    {
      name: "Analytics",
      icon: <img src="/images/icons/leader-board.svg" alt="Analytics" className="custom-icon" />,
      path: "/dashboard/analytics",
    },
  ];
  const menuItemsTwo = [
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
    {
      name: "Help Center",
      icon: <img src="/images/icons/support-main.svg" alt="Analytics" className="custom-icon" />,
      path: "/dashboard/help-center",
    },

  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-icon" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '4px solid #00f0ff', borderRightColor: 'transparent', transform: 'rotate(-45deg)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00f0ff', position: 'absolute', top: '12px', left: '12px' }}></div>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', letterSpacing: '0.5px', textTransform: 'none' }}>Navin</span>
        </div>
        <button className="mobile-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="nav-container">
        <h1 className="nav-header">MAIN MENU</h1>
        <nav className="sidebar-nav">
          {menuItemsOne.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavigation(item.path)}
                title={item.name}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="nav-container">
        <h1 className="nav-header">SYSTEM</h1>
        <nav className="sidebar-nav">
          {menuItemsTwo.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavigation(item.path)}
                title={item.name}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="avatar-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #1e2433', backgroundColor: 'transparent' }}>
            <Shield size={20} color="#8a8f9d" />
          </div>
          <div className="user-info">
            <p className="user-name" style={{ fontSize: '13px', fontWeight: '500', color: '#fff', marginBottom: '2px' }}>Enterprise Node</p>
            <div className="sync-update" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="sync-icon" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <p className="user-role" style={{ fontSize: '11px', color: '#10b981', margin: 0 }}>Syncing: Block 18.2M</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
