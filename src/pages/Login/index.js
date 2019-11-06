import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Menu, Body, SignIn, Container } from './styles';
import logoLg from 'assets/images/Spotify-logo.png'

import {auth} from 'services/firebase';

export default function Login() {
	const [fields, setFields] = useState({
		email: '',
		signInWithEmailAndPassword: '',
	});

	async function login() {
		try {
			await auth.signInWithEmailAndPassword(fields.name, fields.password);
		} catch (error) {}
	}

	function handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		setFields({
			[name]: value,
		});
	}

	return (
		<Container>
			<header>
				<Menu>
					<nav className="navbar navbar-dark">
						<a style={{ margin: 'auto'}} className="my-1" href="login.html">
							<img
								src={logoLg}
								alt="Imagem não disponível"
								style={{width: '15rem'}}
							/>
						</a>
					</nav>
				</Menu>
			</header>

			<main>
				<Body className="container-fluid">
					<div className="row h-100">
						<SignIn
							className="col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-3">
							<h1 className="display-2 mb-3 text-center text-success">
								Entrar
							</h1>

							{/* <!--Formulario Login--> */}
							<form
								className="form-signin px-2"
								method="POST"
								action="assets/php/login.php">
								<label>
									Usuário ou Email
								</label>
								<input
									type="text"
									name="input_usuario"
									className="form-control form-control-lg w-100"
									placeholder="Digite seu usuário ou email"
									required
								/>

								<label className="mt-2">
									Senha
								</label>
								<input
									type="password"
									name="input_senha"
									className="form-control form-control-lg w-100"
									placeholder="Digite sua senha"
									required
								/>
								<small>
									<a href="pgesqsenha.php">
										Esqueceu a senha?
									</a>
								</small>

								{/* <!-- Button de Enviar Formulario--> */}
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
