import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Menu, Body, SignIn, Container } from './styles';
import logoLg from 'assets/images/Spotify-logo.png';

import { Link } from 'react-router-dom';
import { auth } from 'services/firebase';

export default function Login() {
	const location = useLocation();
	const history = useHistory();
	const { from } = location.state || { from: { pathname: '/' } };

	const [fields, setFields] = useState({
		email: '',
		password: '',
	});

	async function login(event) {
		event.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(fields.email, fields.password);
			history.replace(from);
		} catch (error) {
			var errorCode = error.code;

			if (errorCode === 'auth/wrong-password') {
				console.tron.log('senha errada');
			} else if (errorCode === 'auth/user-not-found') {
				console.tron.log('usuario n encontrado');
			} else if (errorCode === 'auth/invalid-email') {
				console.tron.log('email invalido');
			} else if (errorCode === 'auth/user-disabled') {
				console.tron.log('usuario desabilitado');
			} else {
				console.tron.log(error);
			}
			console.log(error);
		}
	}

	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		// let fieldsLocal = Object.assign({}, fields);
		// Object.assign(fieldsLocal, {
		// 	[name]: value,
		// });
		// setFields(fieldsLocal);

		setFields(state => ({ ...state, [name]: value }));
	}

	return (
		<Container>
			<header>
				<Menu>
					<nav className="navbar navbar-dark">
						{/* TODO arrumar */}
						<a style={{ margin: 'auto' }} className="my-1" href="login.html">
							<img
								src={logoLg}
								alt="Imagem não disponível"
								style={{ width: '15rem' }}
							/>
						</a>
					</nav>
				</Menu>
			</header>

			<main>
				<Body className="container-fluid">
					<div className="row h-100">
						<SignIn className="col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-3">
							<h1 className="display-2 mb-3 text-center text-success">
								Entrar
							</h1>

							{/* Formulario Login */}
							<form onSubmit={login} className="form-signin px-2">
								<label>Usuário ou Email</label>
								<input
									value={fields.email}
									onChange={handleInputChange}
									type="text"
									name="email"
									className="form-control form-control-lg w-100"
									placeholder="Digite seu usuário ou email"
									required
								/>

								<label className="mt-2">Senha</label>
								<input
									value={fields.password}
									onChange={handleInputChange}
									type="password"
									name="password"
									className="form-control form-control-lg w-100"
									placeholder="Digite sua senha"
									required
								/>
								<small>
									<Link to="/register">Não tem conta? Cadastre-se</Link>
								</small>

								{/* Button de Enviar Formulario */}
								<button
									className="btn btn-lg btn-block bg-success w-75  my-4 mx-auto"
									type="submit">
									Entrar
								</button>
							</form>
						</SignIn>
					</div>
				</Body>
			</main>
		</Container>
	);
}
