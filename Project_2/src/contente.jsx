import { useState } from "react";
import StudentCard from "./StudentCard";

export default function Content() {
  const [etudiants, setEtudiants] = useState([
    { id: 1, nom: "Walid", note: 19 },
    { id: 2, nom: "Yassine", note: 14 },
    { id: 3, nom: "Abdelltife", note: 18 },
    { id: 4, nom: "Ahmad", note: 9 }
  ]);

  const [nouveauNom, setNouveauNom] = useState("");
  const [nouvelleNote, setNouvelleNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [erreur, setErreur] = useState("");

  const nextId = etudiants.length > 0 ? Math.max(...etudiants.map(e => e.id)) + 1 : 1;
  const currentIdDisplay = editingId !== null ? editingId : nextId;

  const ajouterEtudiant = () => {
    const newStudent = {
      id: nextId,
      nom: nouveauNom,
      note: Number(nouvelleNote)
    };
    setEtudiants([...etudiants, newStudent]);
  };

  const modifierEtudiant = () => {
    setEtudiants(etudiants.map(etd => 
      etd.id === editingId ? { ...etd, nom: nouveauNom, note: Number(nouvelleNote) } : etd
    ));
    setEditingId(null);
  };

  const supprimerEtudiant = (id) => {
    setEtudiants(etudiants.filter(etd => etd.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setNouveauNom("");
      setNouvelleNote("");
      setErreur("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nouveauNom || nouvelleNote === "") {
      setErreur("Veuillez remplir tous les champs !");
      return;
    }

    const noteNum = Number(nouvelleNote);
    if (noteNum > 20 || noteNum < 0) {
      setErreur("Erreur : La note doit être comprise entre 0 et 20 !");
      return;
    }

    setErreur("");

    if (editingId !== null) {
      modifierEtudiant();
    } else {
      ajouterEtudiant();
    }

    setNouveauNom("");
    setNouvelleNote("");
  };

  const chargerPourModification = (etd) => {
    setEditingId(etd.id);
    setNouveauNom(etd.nom);
    setNouvelleNote(etd.note);
    setErreur("");
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
        Liste des étudiants
      </h2>
      {erreur && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-semibold">
          {erreur}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row gap-4 items-center shadow-sm w-full">
        <div className="w-full md:w-20">
          <input 
            type="text" 
            value={`ID: ${currentIdDisplay}`}
            disabled
            className="w-full bg-slate-200 text-slate-500 border border-slate-300 p-2 rounded-lg outline-none text-center font-bold"
          />
        </div>
        <input 
          type="text" 
          placeholder="Nom de l'étudiant" 
          value={nouveauNom}
          onChange={(e) => setNouveauNom(e.target.value)}
          className="w-full md:flex-1 border border-slate-300 p-2 rounded-lg outline-none focus:border-blue-500"
        />
        <input 
          type="number" 
          placeholder="Note /20" 
          value={nouvelleNote}
          onChange={(e) => setNouvelleNote(e.target.value)}
          className="w-full md:w-32 border border-slate-300 p-2 rounded-lg outline-none focus:border-blue-500"
        />
        
        <button 
          type="submit"
          className={`w-full md:w-auto px-5 py-2 text-white font-semibold rounded-lg transition-colors ${editingId !== null ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {editingId !== null ? "Modifier" : "Ajouter"}
        </button>

        {editingId !== null && (
          <button 
            type="button"
            onClick={() => {
              setEditingId(null);
              setNouveauNom("");
              setNouvelleNote("");
              setErreur("");
            }}
            className="w-full md:w-auto px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            Annuler
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {etudiants.map((item) => (
          <StudentCard 
            key={item.id} 
            etd={item} 
            onDelete={supprimerEtudiant}
            onEdit={chargerPourModification}
          />
        ))}
      </div>
    </main>
  );
}