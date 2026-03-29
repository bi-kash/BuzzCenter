import { Text, Box } from "@chakra-ui/layout"
import Link from "next/link"

// Hollywood spotlight / star logo mark for BuzzCenter
function BuzzMark() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="buzzGrad"
          x1="0"
          y1="0"
          x2="38"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>
      <rect width="38" height="38" rx="10" fill="url(#buzzGrad)" />
      {/* Star shape */}
      <path
        d="M19 7 L21.5 15 L30 15 L23.5 20 L25.5 28 L19 23.5 L12.5 28 L14.5 20 L8 15 L16.5 15 Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  )
}

/**
 * Logo component.
 * @param {boolean} isLight  – if true, renders white text (for dark backgrounds like footer)
 */
export default function Logo({ isLight = false }) {
  return (
    <Box
      as={Link}
      href="/"
      display="flex"
      alignItems="center"
      gap={2}
      _hover={{ opacity: 0.85 }}
      lineHeight={1}
      flexShrink={0}
    >
      <BuzzMark />
      <Text
        as="span"
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="700"
        fontFamily="'Inter', sans-serif"
        letterSpacing="-0.01em"
        color={isLight ? "white" : "brand.ink"}
        lineHeight={1}
      >
        Buzz
        <Text
          as="span"
          color={isLight ? "whiteAlpha.700" : "brand.primary"}
          fontWeight="800"
        >
          Center
        </Text>
      </Text>
    </Box>
  )
}
