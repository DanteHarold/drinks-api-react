import { useEffect, useState, createContext } from "react";
import axios from "axios";
const BebidasContext = createContext();

export const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);

  const [bebidaId, setBebidaId] = useState(null);
  const [receta, setReceta] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    const obtenerReceta = async () => {
      if (!bebidaId) return;
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (e) {
        console.log(e);
      } finally {
        setCargando(false);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  const consultarBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios(url);
      console.log(data);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleBebidaClick = (id) => {
    setBebidaId(id);
  };
  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaClick,
        receta,
        setReceta,
        cargando,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export default BebidasContext;
