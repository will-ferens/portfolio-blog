import { Link, Box, Grid, Text, Heading, GridItem } from '@chakra-ui/react';
import { Work } from '@/types';

const work : Work[] = [
  {
    title: 'Software Engineer',
    company: 'Evolve Vacation Rental',
    years: '2021 - Current',
    summary: 'First hire on a team tasked with rebuilding integrations between Evolve and partners such as Airbnb, Vrbo, and Rentals United with an event-based serverless architecture in AWS.',
    bullets: [
      'Designs, builds, and maintains APIs core to organizational operation of 30,000 properties', 
      'Leverages knowledge of AWS services to provide cost effective and performant software, lowering overhead by as much as 33%',
      'Onboards new employees with specifically developed documentation and tooling designed to set up new engineers for success',
    ],
  },
  {
    title: 'Frontend Engineer',
    company: 'Searchspring',
    years: '2018-2021',
    summary: 'Utilized cross disciplinary knowledge in JavaScript, Angular, React, CSS, PHP, and Java to deliver projects on a tight deadline.',
    bullets: [
      'Responsible for the launch of projects valued at over $200,000 monthly recurring revenue at a company with $10 million annual revenue',
      'Created and maintained an internal tool that decreased project turn around from 3 weeks to 2',
      'Communicated with Sales, Customer Success, and directly with clients to navigate evolving project needs',
    ],
  },
];

export default function Home() {
  return (
    <Box>  
      <Grid
        maxW="1200px"
        templateColumns="repeat(6, 1fr)"
        gridGap={12}
        px={0}
        width="100%"
        mx="auto"
        alignItems="center"
      >
        <GridItem colSpan={3}>
          <Box>
            <Heading as="h1" size={"lg"}>
              Will Ferens
            </Heading>
            <Text>
              Full Stack Developer
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Box>
        <Heading as="h2" size="md" mb={2}>
          About
        </Heading>
        <Text>
          Summary here
        </Text>
      </Box>
      <Box>

      </Box>
    </Box>
  )
}
