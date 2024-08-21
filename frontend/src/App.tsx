import React, { useState } from 'react';
import { Container, Paper, Grid, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const CalculatorButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '60px',
  fontSize: '1.5rem',
}));

const Display = styled(Paper)(({ theme }) => ({
  width: '100%',
  textAlign: 'right',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  fontSize: '2rem',
  minHeight: '60px',
}));

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = async (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = await backend.calculate(operator, firstOperand, inputValue);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Display>{display}</Display>
        <Grid container spacing={1}>
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map((btn) => (
            <Grid item xs={3} key={btn}>
              <CalculatorButton
                variant="contained"
                color="secondary"
                onClick={() => btn === '.' ? inputDecimal() : inputDigit(btn)}
              >
                {btn}
              </CalculatorButton>
            </Grid>
          ))}
          <Grid item xs={3}>
            <CalculatorButton variant="contained" color="primary" onClick={() => performOperation('+')}>
              +
            </CalculatorButton>
          </Grid>
          <Grid item xs={3}>
            <CalculatorButton variant="contained" color="primary" onClick={() => performOperation('-')}>
              -
            </CalculatorButton>
          </Grid>
          <Grid item xs={3}>
            <CalculatorButton variant="contained" color="primary" onClick={() => performOperation('*')}>
              ×
            </CalculatorButton>
          </Grid>
          <Grid item xs={3}>
            <CalculatorButton variant="contained" color="primary" onClick={() => performOperation('/')}>
              ÷
            </CalculatorButton>
          </Grid>
          <Grid item xs={6}>
            <CalculatorButton variant="contained" color="error" onClick={clear}>
              C
            </CalculatorButton>
          </Grid>
          <Grid item xs={6}>
            <CalculatorButton variant="contained" color="success" onClick={() => performOperation('=')}>
              =
            </CalculatorButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
