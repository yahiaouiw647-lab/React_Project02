export default function Menu() {
  return (
    <aside className="sidebar-gray w-full md:w-60 bg-slate-200 p-5 flex flex-col shrink-0">
      <span className="menu-title text-xs font-bold text-slate-600 uppercase mb-3 block">Menu</span>
      <nav className="nav-links flex flex-col gap-2">
        <a href="#" className="p-2 rounded hover:bg-slate-300 text-slate-800">Accueil</a>
        <a href="#" className="p-2 rounded bg-slate-300 text-slate-800 font-semibold">Étudiants</a>
        <a href="#" className="p-2 rounded hover:bg-slate-300 text-slate-800">Notes</a>
      </nav>
    </aside>
  );
}