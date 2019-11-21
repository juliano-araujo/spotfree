import React from 'react';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Logo from 'assets/images/Spotify-logo.png';
import { FixedNav } from './styles';

export default function SideMenu() {
	return (
		<aside className="col-2 col-sm-2 col-md-3 col-lg-2 d-none d-md-flex d-lg-flex px-0">
			<FixedNav className="h-100 w-100 pl-4">
				{/* Logo */}
				<div className="pl-4">
					<img
						className="my-4"
						src={Logo}
						alt="Imagem não Disponível"
						style={{ width: '8rem' }}
					/>
				</div>

				{/* Links das Paginas */}
				<ul className="nav flex-column">
					<li className="nav-item">
						<Link to="/browse" className="nav-link border-left border-success">
							<Icon icon="home" />
							&nbsp;Início
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/search" className="nav-link">
							<Icon icon="search" />
							&nbsp;Pesquisar
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/collection" className="nav-link">
							<Icon icon="compact-disc" />
							&nbsp;Minha Biblioteca
						</Link>
					</li>
				</ul>
			</FixedNav>
		</aside>
	);
}
