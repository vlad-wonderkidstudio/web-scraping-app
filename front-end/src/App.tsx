import { FC } from 'react';
import ScraperForm from './components/ScraperForm';
import ResultsDisplay from './components/ResultsDisplay';
import './App.css';
import { Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

const App: FC = () => {

  return (
    <ChakraProvider>
      <Box>
        <ScraperForm/>
        <ResultsDisplay/>
      </Box>
    </ChakraProvider>
  );
};

export default App;
