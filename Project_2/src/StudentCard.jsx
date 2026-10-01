export default function StudentCard({ etd, onDelete, onEdit }) {
  return (
    <div 
      onClick={() => onEdit(etd)} 
      className={`cursor-pointer rounded-xl p-5 shadow flex flex-col justify-between transition-transform hover:scale-105 w-full ${etd.note >= 10 ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"}`}
    >
      <div>
        <span className="text-xs font-bold text-slate-500 mb-1 block">ID: {etd.id}</span>
        <h3 className="text-lg font-bold text-slate-800">{etd.nom}</h3>
        <p className="mt-2 text-slate-600">
          Note : <span className={`font-semibold ${etd.note >= 10 ? "text-green-600" : "text-red-600"}`}>{etd.note} / 20</span>
        </p>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(etd.id);
          }} 
          className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded font-semibold transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}