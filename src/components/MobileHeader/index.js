import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';
import Logo from 'assets/images/Spotify-logo.png';

export default function MobileHeader() {
	return (
		<Container className="d-block d-md-none">
			<nav className="navbar navbar-dark">
				<Link to="/">
					<img className="w-75" src={Logo} alt="Imagem não disponível" />
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse">
					<div className="navbar-nav">
						<Link className="nav-item nav-link" to="/browse">
							Início
							<span className="sr-only">(current)</span>
						</Link>
						<Link className="nav-item nav-link" to="/search">
							Pesquisar
						</Link>
						<Link className="nav-item nav-link" to="/collection">
							Minha Biblioteca
						</Link>
					</div>
				</div>
			</nav>
		</Container>
	);
}
