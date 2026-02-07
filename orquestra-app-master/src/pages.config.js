import Agenda from "./pages/Agenda";
import CentralConteudo from "./pages/CentralConteudo";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Financas from "./pages/Financas";
import Habitos from "./pages/Habitos";
import Home from "./pages/Home";
import Tarefas from "./pages/Tarefas";
import __Layout from "./Layout.jsx";

export const PAGES = {
  "Agenda": Agenda,
  "CentralConteudo": CentralConteudo,
  "Chat": Chat,
  "Dashboard": Dashboard,
  "Financas": Financas,
  "Habitos": Habitos,
  "Home": Home,
  "Tarefas": Tarefas,
};

export const pagesConfig = {
  mainPage: "Dashboard",
  Pages: PAGES,
  Layout: __Layout,
};
