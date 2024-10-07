import { ChangeEvent, FC, useState } from 'react';
import { useLazyGetResultsQuery, useScrapeMutation } from '../services/scraping';
import { Box, Button, Heading, Input, useToast, VStack } from '@chakra-ui/react';
import { ApiEndpointResponse } from '../interfaces/ApiEndpointResponse.interface';

const ScraperForm: FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [scrape, { isLoading }] = useScrapeMutation();
  const [getResults] = useLazyGetResultsQuery();

  const toast = useToast();

  const handleScrape = async () => {
    try {
      await scrape(inputUrl.trim()).unwrap()
      getResults();
      setInputUrl('')
    } catch(e) {
      let errMessage = 'An unknown error happened';

      if (e?.hasOwnProperty('message')){
        const message = (e as ApiEndpointResponse).message;
        errMessage = Array.isArray(message) ? message.join(', ') : String(message);
      }
      else if (e?.hasOwnProperty('error')) {
        errMessage = String((e as ApiEndpointResponse).error);
      }

      toast({
        title: 'An error occurred',
        description: errMessage,
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxW="md" mx="auto" py={5}>
      <VStack spacing={5}>
        <Heading as="h1" size="lg" textAlign="center">
          Web Scraping and Data Presentation
        </Heading>
        <Input
          value={inputUrl}
          placeholder="Enter URL. e.g. http://example.com"
          size="md"
          variant="outline"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputUrl(e.target.value)}
        />
        <Button
          colorScheme="blue"
          size="md"
          width="full"
          onClick={handleScrape}
          isLoading={isLoading}
        >
          Trigger Scrape
        </Button>
      </VStack>
    </Box>
  );
};

export default ScraperForm;
