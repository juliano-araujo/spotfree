import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

import logoLg from 'assets/images/Spotify-logo.png'
import logoMd from 'assets/images/Spotify-logo-md.png'
import { Container } from './styles';

export default function SideMenu() {
  return (
	<aside class="col-md-2 d-none d-md-block d-lg-block px-0">
        <Container className="container-fluid h-100">
            <div className="container-fluid d-none d-lg-block">
                <img className="my-4" src={logoLg} alt="Imagem não Disponível" style={{width: '9rem'}}/>
            </div>
            <div className="container-fluid d-none d-md-block d-lg-none">
                <img className="my-4" src={logoMd} alt="Imagem não Disponível"
                            style={{width: '4rem'}}/>
            </div>

            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link text-white border-left border-success" to="">Início</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="">Pesquisar</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="">Minha Biblioteca</Link>
                </li>
            </ul>
        </Container>
	</aside>
  );
}
