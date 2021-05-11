import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme: Theme) => 
	createStyles({
		container: {
			display:'flex',
			flexWrap: 'wrap',
			width:'400',
			margin: `${theme.spacing(10)} auto`
		},
		loginBtn: {
			marginTop: theme.spacing(2),
			flexGrow: 1
		},
		header:{
			textAlign: 'center',
			background: '#3B3B98',
			color: '#fff'
		},
		card:{
			marginTop: theme.spacing(10),
			marginLeft: theme.spacing(90),
		
		}
	})
);	



const Login = () => {
	const classes = useStyles();
	const [state, dispatch] = useReducer(reducer, inicioState);

	useEffect(() =>{
		if(state.usuario.trim() && state.senha.trim()){
			dispatch({
				type: 'setBotaoDesativado',
				payload: false
			});
		} else {
			dispatch({
				type: 'setBotaoDesativado',
				payload: true
			});
		}
	}, [state.usuario, state.senha]);
	const cuidaLogin = () => {
	if (inicioState.usuario === 'leticia.bonfim@sistemapoliedro.com.br' && inicioState.senha === 'senha') {
		dispatch({
			type:'loginSucesso',
			payload: 'Login Bem-Sucedido'
		});
	} else {
		dispatch({
			type: 'loginFalhou',
			payload: 'Nome de usuário ou senha incorretos'
		});
	}
};


const cuidaBotao= (event: React.KeyboardEvent) => {
	if (event.keyCode === 13 || event.which === 13){
		inicioState.BotaoDesativado || cuidaLogin();
	}
};


const cuidaUsuarioMudanca: React.ChangeEventHandler<HTMLInputElement> = (event) => {
	dispatch({
		type: 'setUsuario',
		payload: event.target.value
	});
};


const cuidaSenhaMudanca: React.ChangeEventHandler<HTMLInputElement> = (event) => {
	dispatch({
		type: 'setSenha',
		payload: event.target.value
	});
};

	return(
		<form className={classes.container} noValidate autoComplete="off">
			<Card className={classes.card}>
				<CardHeader className={classes.header} title="Tela Novi" />
				<CardContent>
					<div>
						<TextField
						error={state.erro}
						fullWidth
						id="usuario"
						type="email"
						label="Usuario"
						placeholder="leticia.bonfim@sistemapoliedro.com.br"
						margin="normal"
						onChange={cuidaUsuarioMudanca}
						onKeyPress={cuidaBotao}
						/>
						<TextField
						error={state.erro}
						fullWidth
						id="senha"
						type="password"
						label="senha"
						placeholder="senha"
						margin="normal"
						helperText={state.textoInicial}
						onChange={cuidaSenhaMudanca}
						onKeyPress={cuidaBotao}
						/>
					</div>
				</CardContent>
				<CardActions>
					<Button
						variant="contained"
						size="large"
						color="secondary"
						className={classes.loginBtn}
						onClick={cuidaLogin}
						disabled={state.BotaoDesativado}>
						Login
					</Button>
				</CardActions>
			</Card>
		</form>	

	);
}








// login State

type State = {
	usuario: string
	senha: string
	BotaoDesativado: boolean
	textoInicial: string
	erro: boolean
};

const inicioState:State ={
	usuario: '',
	senha: '',
	BotaoDesativado: true,
	textoInicial: '',
	erro: false

};

type Acao = {type: 'setUsuario', payload: string} | { type: 'setSenha', payload: string }
 | {type: 'setBotaoDesativado', payload: boolean} | { type: 'loginSucesso', payload: string }
 | {type: 'loginFalhou', payload: string} | { type:'setErro', payload: boolean };


 const reducer = (state: State, action: Acao): State => {
 	switch (action.type) {
 		case "setUsuario":
 			return {
 				...state,
 				usuario:action.payload
 			};
 		case "setSenha":
 			return {
 				...state,
 				senha:action.payload
 			};
 		case "setBotaoDesativado":
 			return {
 				...state,
 				BotaoDesativado:action.payload
 			};
 		case "loginSucesso":
 			return {
 				...state,
 				textoInicial:action.payload,
 				erro: false
 			};
 		case "loginFalhou":
 			return {
 				...state,
 				textoInicial:action.payload,
 				erro: true
 			};
 		case "setErro":
 			return {
 				...state,
 				erro:action.payload
 			};
 		

 	}
 }

 export default Login;