import { useState } from "react";
import styled from "styled-components";

export const CombinationForm = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [pickItems, setPickItems] = useState(0);
  const [withRepetition, setWithRepetition] = useState(false);
  const [withOrder, setWithOrder] = useState(false);

  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

  const combination = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
  const permutation = (n, k) => factorial(n) / factorial(n - k);

  const calculateResult = () => {
    const n = totalItems;
    const k = pickItems;

    if (n < 0 || k < 0 || (!withRepetition && k > n)) return NaN;

    if (withOrder) {
      return withRepetition ? Math.pow(n, k) : permutation(n, k);
    } else {
      return withRepetition
        ? combination(n + k - 1, k)
        : combination(n, k);
    }
  };

  return (
    <Form>
      <FormRow>
        <Label>כמה פריטים יש בסך הכל?</Label>
        <NumberInput
          type="number"
          value={totalItems}
          min={0}
          onChange={(e) => setTotalItems(Number(e.target.value))}
        />
      </FormRow>

      <FormRow>
        <Label>כמה מהם נבחר?</Label>
        <NumberInput
          type="number"
          value={pickItems}
          min={0}
          onChange={(e) => setPickItems(Number(e.target.value))}
        />
      </FormRow>

      <FormRow>
        <Label>האם יש חזרות?</Label>
        <Select value={withRepetition} onChange={(e) => setWithRepetition(e.target.value === "true")}>\n          <option value="false">בלי חזרות</option>
          <option value="true">עם חזרות</option>
        </Select>
      </FormRow>

      <FormRow>
        <Label>האם לסדר יש חשיבות?</Label>
        <Select value={withOrder} onChange={(e) => setWithOrder(e.target.value === "true")}>\n          <option value="false">ללא סדר</option>
          <option value="true">עם סדר</option>
        </Select>
      </FormRow>

      <ResultBox>
        <strong>סוג קומבינטוריקה:</strong><br />
        {withOrder ? "פרמוטציה" : "קומבינציה"} {withRepetition ? "עם חזרות" : "בלי חזרות"}<br /><br />
        <strong>כמות אפשרויות:</strong><br />
        {Number.isFinite(calculateResult()) ? calculateResult().toLocaleString() : "לא ניתן לחשב"}
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