import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { auth } from 'services/firebase';
import { Container, Menu, LogoContainer, Body, SignIn } from './styles';
import Logo from 'assets/images/Spotify-logo.png';

export default function Register() {
	const location = useLocation();
	const history = useHistory();
	const { from } = location.state || { from: { pathname: '/' } };

	const [fields, setFields] = useState({
		email: '',
		password: '',
		username: '',
	});

	async function register(event) {
		event.preventDefault();
		try {
			auth.createUserWithEmailAndPassword(fields.email, fields.password);
			history.replace('/');
		} catch (err) {
			const errCode = err.code;
			const errMessage = err.message;
			if (errCode === 'auth/email-already-in-use') {
				console.log('Email já cadastrado');
			} else if (errCode === 'auth/invalid-email') {
				console.log('Email Inválido');
			} else if (errCode === 'auth/weak-password') {
				console.log('Senha fraca');
			} else {
				console.log(errMessage);
			}
		}
	}

	function handleFieldChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		setFields(state => ({ ...state, [name]: value }));
	}

	return (
		<Container>
			{/* Header */}
			<header>
				<Menu>
					<nav className="navbar navbar-dark">
						<LogoContainer className="my-1">
							<img
								src={Logo}
								alt="Imagem não disponível"
								style={{ width: '15rem' }}
							/>
						</LogoContainer>
					</nav>
				</Menu>
			</header>

			{/* Main */}
			<main>
				<Body className="container-fluid">
					<div className="row h-100">
						<SignIn className="col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-3">
							<h1 className="display-3 mb-3 text-center text-success">
								Cadastro
							</h1>

							{/* Formulario Login */}
							<form className="form-signin px-2" onSubmit={register}>
								{/* Email */}
								<label for="input.email" className="">
									Email
								</label>
								<input
									name="email"
									value={fields.email}
									onChange={handleFieldChange}
									type="text"
									id="input.email"
									className="form-control form-control w-100"
									placeholder="Digite seu email"
									required
								/>

								{/* User */}
								<label for="input.user" className="mt-2">
									Usuario
								</label>
								<input
									name="username"
									value={fields.username}
									onChange={handleFieldChange}
									type="text"
									id="input.user"
									className="form-control form-control w-100"
									placeholder="Digite seu usuário"
									required
								/>

								{/* Senha */}
								<label for="input.senha" className="mt-2">
									Senha
								</label>
								<input
									name="password"
									value={fields.password}
									onChange={handleFieldChange}
									type="password"
									id="input.senha"
									className="form-control form-control w-100"
									placeholder="Digite sua senha"
									required
								/>

								{/*  Button de Enviar Formulario */}
								<button
									id="botao-padrao"
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
