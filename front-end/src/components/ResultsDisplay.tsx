import React from "react";
import { useGetResultsQuery } from "../services/scraping";
import { Box, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { ApiEndpointResponse } from "../interfaces/ApiEndpointResponse.interface";

const ResultsDisplay: React.FC = () => {
  const { data: results, isLoading, error  } = useGetResultsQuery()

  if (isLoading) {
    return (
      <Box textAlign="center" py={5} >
        <Spinner size="xl" />
      </Box>
    );
  }
  if (error) {
    let errMessage = error.toString();

    if (error?.hasOwnProperty('message')){
      const message = (error as ApiEndpointResponse).message;
      errMessage = Array.isArray(message) ? message.join(', ') : String(message);
    }
    else if (error?.hasOwnProperty('error')) {
      errMessage = String((error as ApiEndpointResponse).error);
    }
    return (
      <Box textAlign="center" py={5}>
        <Text color="red.500">Error: { errMessage }</Text>
      </Box>
    );
  }
  if (!results) {
    return <Box textAlign="center" py={5}>No results :(</Box>
  }

  return (
    <Box maxW="4xl" mx="auto" py={5} overflowX="auto">
      <Table variant="striped" size="md">
        <TableCaption>Scraping Results</TableCaption>
        <Thead>
          <Tr>
            <Th>URL</Th>
            <Th>URLs Found</Th>
            <Th>Domains</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results?.map((result) => (
            <Tr key={result._id}>
              <Td>{result.url}</Td>
              <Td>{result.foundUrlsCount}</Td>
              <Td>{result.domainsCount}</Td>
              <Td>{new Date(result.createdAt).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ResultsDisplay;
