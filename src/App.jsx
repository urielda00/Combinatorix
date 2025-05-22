import { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { CombinationForm } from './components/CombinationForm';

function App() {
	return (
		<>
			<GlobalStyle />
			<AppContainer>
				<Title>🎰 Combinatorix Play</Title>
				<CombinationForm />
				<Copyright>© by Uriel Dahan</Copyright>
			</AppContainer>
		</>
	);
}

export default App;

const AppContainer = styled.div`
	max-width: 600px;
	margin: 2rem auto;
	padding: 1.5rem;
	border-radius: 16px;
	background: #f8f9fa;
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
	font-size: 1.8rem;
	text-align: center;
	margin-bottom: 1.5rem;
`;

const Copyright = styled.footer`
	text-align: center;
	margin-top: 2rem;
	font-size: 0.85rem;
	color: #777;
`;
