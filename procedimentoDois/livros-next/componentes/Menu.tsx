import React from 'react';
import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/">
              Home
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/livroLista">
              Catálogo
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" href="livroDados">
              Novo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
