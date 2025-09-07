const navItems = [
  { label: "Home", icon: "🏠" },
  { label: "New", icon: "🆕" },
  { label: "Radio", icon: "📻" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 p-4 border-r bg-white">
      <input type="text" placeholder="Search" className="mb-4 w-full p-2 border rounded" />
      <nav>
        {navItems.map(item => (
          <SidebarItem key={item.label} label={item.label} icon={item.icon} />
        ))}
      </nav>
    </aside>
  );
};
