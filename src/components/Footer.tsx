"use client"

import {
  Box,
  Container,
  HStack,
  Link,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react"

export const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <Container maxW="1200px" py="24">
        <Divider borderColor="gray.800" mb="24" />
        <Heading as="h2" size="lg" mb="6">
          Get in Touch
        </Heading>
        <HStack spacing="8">
          <Link
            href="mailto:will.ferens@gmail.com"
            color="gray.200"
            _hover={{ color: "white" }}
          >
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/will-ferens/"
            isExternal
            color="gray.200"
            _hover={{ color: "white" }}
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/will-ferens"
            isExternal
            color="gray.200"
            _hover={{ color: "white" }}
          >
            GitHub
          </Link>
        </HStack>
      </Container>

      {/* Footer */}
      <Box borderTop="1px" borderColor="gray.800" py="8">
        <Container maxW="1200px">
          <Text color="gray.500" fontSize="sm">
            © {new Date().getFullYear()} Will Ferens
          </Text>
        </Container>
      </Box>
    </>
  )
}

export default Footer
