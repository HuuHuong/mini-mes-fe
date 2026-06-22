import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useFunctions } from "./useFunctions";

export const Sidebar = memo(() => {
  const location = useLocation();
  const {
    categories,
    themeMode,
    collapsedCategories,
    toggleCategory,
    onLogout,
    onToggleTheme,
  } = useFunctions();
  return (
    <aside className="sidebar">
      {/* Header / Brand */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-brand-name">Mini MES</span>
          <span className="sidebar-badge">PRO</span>
        </div>

        {/* Theme Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleTheme}
          className="sidebar-theme-toggle"
          title={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
        >
          {themeMode === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {categories.map((category) => {
          const isCollapsed = collapsedCategories[category.title];
          const hasActiveItem = category.items.some(
            (item) => location.pathname === item.path,
          );

          return (
            <div key={category.title} className="sidebar-category">
              <button
                onClick={() => toggleCategory(category.title)}
                className={`sidebar-category-btn${hasActiveItem ? " is-active" : ""}`}
              >
                <span className="sidebar-category-icon">{category.icon}</span>
                <span className="sidebar-category-title">{category.title}</span>
                <span
                  className={`sidebar-category-arrow${isCollapsed ? "" : " is-open"}`}
                >
                  ▶
                </span>
              </button>

              {!isCollapsed && (
                <div className="sidebar-items">
                  {category.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-item${isActive ? " is-active" : ""}`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">OP</div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">Operator Admin</p>
            <p className="sidebar-user-meta">Shift A • Line 1</p>
          </div>
        </div>
        <button
          id="logout-btn"
          onClick={onLogout}
          className="sidebar-logout-btn"
        >
          <span>🚪</span> Logout Session
        </button>
      </div>
    </aside>
  );
});
