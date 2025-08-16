import React, { useEffect, useState } from "react";
import ConsentManager from "./ConsentManager";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Painel from "./Painel";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });
    return () => unsubscribe();
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <ConsentManager />
      {usuario ? (
        <Painel user={usuario} />
      ) : (
        <Login onLogin={() => setUsuario(true)} />
      )}
    </div>
  );
}

export default App;
