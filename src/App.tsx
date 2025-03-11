import api from "./services/api";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { IType } from "./@types";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import TypePage from "./pages/TypePage";

function App() {
  // Variable d'état qui stock tous les 'types' de pokémons
  const [types, setTypes] = useState<IType[]>([]);

  // Récupérer les types par appel API au chargement de la page
  useEffect(() => {
    getTypes();
  }, []);

  // Fonction pour récupérer toutes les types
  async function getTypes() {
    // Appel API : ...results: {name, url}
    const results = await api.getTypes();
    setTypes(results);
  }

  return (
    <>
      <Header types={types} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/type/:id" element={<TypePage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
