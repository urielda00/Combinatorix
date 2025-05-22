import { useState } from 'react';
import styled from 'styled-components';

export const CombinationForm = () => {
	const [totalItems, setTotalItems] = useState('');
	const [pickItems, setPickItems] = useState('');
	const [withRepetition, setWithRepetition] = useState(false);
	const [withOrder, setWithOrder] = useState(false);

	const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

	const combination = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
	const permutation = (n, k) => factorial(n) / factorial(n - k);

	const MAX_SAFE_INPUT = 100;

	const calculateResult = () => {
		const n = Number(totalItems);
		const k = Number(pickItems);

		if (!Number.isFinite(n) || !Number.isFinite(k) || n < 0 || k < 0 || (!withRepetition && k > n)) {
			return { value: NaN, reason: 'invalid' };
		}

		if (n > MAX_SAFE_INPUT || k > MAX_SAFE_INPUT) {
			return { value: NaN, reason: 'too_large' };
		}

		const value = withOrder ? (withRepetition ? Math.pow(n, k) : permutation(n, k)) : withRepetition ? combination(n + k - 1, k) : combination(n, k);

		return { value, reason: null };
	};
	const { value, reason } = calculateResult();

	return (
		<Form>
			<FormRow>
				<Label>כמה פריטים יש בסך הכל?</Label>
				<NumberInput type='number' value={totalItems} min={0} max={100} onChange={(e) => setTotalItems(e.target.value)} />
			</FormRow>

			<FormRow>
				<Label>כמה מהם נבחר?</Label>
				<NumberInput type='number' value={pickItems} min={0} max={100} onChange={(e) => setPickItems(e.target.value)} />
			</FormRow>

			<FormRow>
				<Label>האם יש חזרות?</Label>
				<Select dir='rtl' value={withRepetition} onChange={(e) => setWithRepetition(e.target.value === 'true')}>
					\n <option value='false'>בלי חזרות</option>
					<option value='true'>עם חזרות</option>
				</Select>
			</FormRow>

			<FormRow>
				<Label>האם לסדר יש חשיבות?</Label>
				<Select dir='rtl' value={withOrder} onChange={(e) => setWithOrder(e.target.value === 'true')}>
					\n <option value='false'>ללא סדר</option>
					<option value='true'>עם סדר</option>
				</Select>
			</FormRow>

			<ResultBox>
				<strong>סוג קומבינטוריקה:</strong>
				<br />
				{withOrder ? 'פרמוטציה' : 'קומבינציה'} {withRepetition ? 'עם חזרות' : 'בלי חזרות'}
				<br />
				<br />
				<strong>כמות אפשרויות:</strong>
				<br />
				{reason === 'too_large' ? 'אנא הכנס מספר קטן יותר' : reason === 'invalid' ? 'לא ניתן לחשב עם ערכים שליליים או שגויים' : value.toLocaleString()}
			</ResultBox>
		</Form>
	);
};

const Form = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const FormRow = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const Label = styled.label`
	font-weight: bold;
	font-size: 0.95rem;
	align-self: flex-end;
	margin-bottom: 0.25rem;
`;

const NumberInput = styled.input`
	padding: 0.4rem;
	font-size: 1rem;
	width: 100%;
`;

const Select = styled.select`
	padding: 0.4rem;
	font-size: 1rem;
	width: 100%;
`;

const ResultBox = styled.div`
	margin-top: 1.5rem;
	background: #fff;
	padding: 0.9rem;
	border-radius: 8px;
	border: 1px solid #ddd;
	font-size: 0.95rem;
	direction: rtl;
`;
