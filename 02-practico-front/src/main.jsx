import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPeliculas from './components/admin/peliculas/adminPeliculas.jsx';
import AgregarPelicula from './components/admin/peliculas/agregarPelicula.jsx';
import AgregarActoresAPelicula from './components/admin/peliculas/agregarActoresAPeliculas.jsx';
import AdminActores from './components/admin/repartos/adminActores.jsx';
import CrearOEditarActor from './components/admin/repartos/agregarActor.jsx';
import VerDetallesPelicula from './components/admin/peliculas/verDetallesDePelicula.jsx';
import VerDetallesPeliculaUsuario from './components/peliculas/detallePelicula.jsx';
import VerActorConPeliculas from './components/peliculas/DetalleActor.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminPeliculas />,
  },
  {
    path: "/admin/peliculas/crear",
    element: <AgregarPelicula />,
  },
  {
    path: "/admin/peliculas/editar/:id",
    element: <AgregarPelicula />,
  },
  {
    path: "/admin/agregarActores/:id/actores",
    element: <AgregarActoresAPelicula />,
  },
  {
    path: "/admin/actores",
    element: <AdminActores />,
  },
  {
    path: "/admin/actores/crear",
    element: <CrearOEditarActor />,
  },
  {
    path: "/admin/actores/editar/:id",
    element: <CrearOEditarActor />,
  },
  {
    path: "/admin/peliculas/:id",
    element: <VerDetallesPelicula />,
  },
  {
    path: "/peliculas/:id",
    element: <VerDetallesPeliculaUsuario />,
  },
  {
    path: "/actores/:id/peliculas",
    element: <VerActorConPeliculas />,
  },
  {

  },
]
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
