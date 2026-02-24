"use client"

import React from "react"
import {
  Box,
  Grid,
  Text,
  Heading,
  GridItem,
  VStack,
  Container,
  Divider,
} from "@chakra-ui/react"
import { Work } from "@/types"
import { Footer } from "./Footer"

const work: Work[] = [
  {
    title: "Senior Software Engineer",
    company: "Sigil Inc",
    years: "2024 - Present",
    summary:
      "Building a suite of tools for brand protection - we identify and mitigate unauthorized sellers across marketplaces.",
    bullets: [
      "Owns feature delivery - from gathering requirements to deployment - across the stack",
      "Designs and maintains a suite of applications that monitor realtime marketplace data and support the company's core operations",
      "Collaborates with product and customers to define and implement new features",
    ],
  },
  {
    title: "Lead Frontend Engineer",
    company: "Emgenisys",
    years: "2024 - Present",
    summary:
      "Leading frontend development of a platform to support veterinary embryologists assessing embryo viability using Machine Learning.",
    bullets: [
      "Architects and implements scalable, maintainable, and performant frontend software supporting video upload, playback, and ML scoring workflows",
      "Leads UI/UX strategy for video and image analysis tools",
      "Partners with backend engineers to design APIs for ML inference and clinical data workflows",
    ],
  },
  {
    title: "Software Engineer",
    company: "Evolve Vacation Rental",
    years: "2021 - 2024",
    summary:
      "First hire on a team tasked with rebuilding integrations between Evolve and partners such as Airbnb, Vrbo, and Rentals United with an event-based serverless architecture in AWS.",
    bullets: [
      "Designed, built, and maintained APIs core to organizational operation of 30,000 properties",
      "Reduced infrastructure costs by 33% through optimized AWS architecture",
      "Onboarded new employees with specifically developed documentation and tooling designed to set up new engineers for success",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Searchspring",
    years: "2018-2021",
    summary:
      "Utilized cross disciplinary knowledge in JavaScript, Angular, React, CSS, PHP, and Java to deliver projects on a tight deadline.",
    bullets: [
      "Responsible for the launch of projects valued at over $200,000 monthly recurring revenue at a company with $10 million annual revenue",
      "Created and maintained an internal tool that decreased project turn around from 3 weeks to 2",
      "Communicated with Sales, Customer Success, and directly with clients to navigate evolving project needs",
    ],
  },
]

export const Home = () => {
  return (
    <Box bg="black" color="gray.200" minH="100vh">
      {/* Nav */}
      <Container maxW="1200px" pt="8">
        <Text fontSize="xl" fontWeight="bold">
          W
        </Text>
      </Container>

      {/* Hero Section */}
      <Container maxW="1200px" pt="24">
        <Heading as="h1" size="2xl" mb="4">
          WILL FERENS
        </Heading>
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          mb="6"
        >
          Software Engineer
        </Text>
        <Text color="gray.400" fontSize="lg" maxW="lg">
          I design and ship complex software platforms.
        </Text>
        <Text color="gray.400" fontSize="lg" maxW="lg" mt="6">
          From brand protection systems monitoring large scale marketplaces to
          Machine Learning tools used by veterinary embryologists, I work across
          the stack to build scalable systems that drive measurable impact.
        </Text>
      </Container>

      {/* Work Experience Section */}
      <Container maxW="1200px" pb="12" pt="16">
        <Heading as="h2" size="lg" mb="12">
          Work Experience
        </Heading>

        <VStack spacing="16" align="stretch">
          {work.map((job, index) => (
            <Box key={index}>
              <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
                <GridItem>
                  <Text fontWeight="bold" fontSize="xl">
                    {job.title}
                  </Text>
                  <Text color="gray.400">{job.company}</Text>
                  <Text color="gray.500" fontSize="sm" mt="2">
                    {job.years}
                  </Text>
                </GridItem>

                <GridItem>
                  <Text mb="6">{job.summary}</Text>
                  <VStack align="start" spacing="2">
                    {job.bullets.map((bullet, idx) => (
                      <Text key={idx} color="gray.400">
                        • {bullet}
                      </Text>
                    ))}
                  </VStack>
                </GridItem>
              </Grid>
              {index < work.length - 1 && <Divider borderColor="gray.800" />}
            </Box>
          ))}
        </VStack>
      </Container>

      <Footer />
    </Box>
  )
}

export default Home
