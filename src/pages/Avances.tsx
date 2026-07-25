// Tracker interno de avances + finanzas (JC / Javier, login por PIN).
// La página es un HTML autocontenido (estilos + JS vanilla que habla directo con
// Supabase por REST). Lo montamos como ruta real del SPA en un iframe srcDoc para
// no depender de que el hosting sirva public/ como estático — sin sandbox, así el
// iframe hereda el origen y le siguen funcionando sessionStorage y fetch.
// Fuente única: public/avances/index.html (se importa crudo, no hay copia paralela).
import trackerHtml from "../../public/avances/index.html?raw";

const Avances = () => (
  <iframe
    title="ViralClicker — Avances del Lanzamiento"
    srcDoc={trackerHtml}
    style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      border: 0,
    }}
  />
);

export default Avances;
