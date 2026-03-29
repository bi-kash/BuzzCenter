import {
  Box,
  Flex,
  Icon,
  useDisclosure,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react"
import { HiX as CloseIcon, HiMenu as MenuIcon, HiSearch } from "react-icons/hi"
import { useRouter } from "next/router"
import { useState } from "react"
import Logo from "./Logo"
import MobileNavbar from "./MobileNavbar"
import NavDropdown from "./NavDropdown"
import AuthButton from "../auth/AuthButton"

function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = e => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/article?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSearch}
      display={{ base: "none", lg: "block" }}
    >
      <InputGroup size="sm" w="220px">
        <InputLeftElement pointerEvents="none">
          <Icon as={HiSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search movies & shows..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          bg="gray.50"
          borderColor="gray.200"
          borderRadius="md"
          fontSize="sm"
          _placeholder={{ color: "gray.400" }}
          _focus={{
            borderColor: "brand.primary",
            boxShadow: "0 0 0 1px #DC2626",
            bg: "white",
          }}
        />
      </InputGroup>
    </Box>
  )
}

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box pos="fixed" top={0} left={0} right={0} zIndex="10" id="header-nav">
      {/* Main header */}
      <Flex
        as="nav"
        alignItems="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mx="auto"
        py={{ base: 2, lg: 3 }}
        px={{ base: 4, md: 8, lg: 12 }}
        bgColor="rgba(255, 255, 255, 0.97)"
        color="gray.800"
        className="header"
        borderBottom="3px solid"
        borderBottomColor="brand.primary"
        boxShadow="0 2px 12px rgba(0,0,0,0.06)"
        sx={{
          "@supports (backdrop-filter: saturate(180%) blur(20px))": {
            backdropFilter: "saturate(180%) blur(20px)",
            bgColor: "rgba(255, 255, 255, 0.92)",
          },
          "@supports (-webkit-backdrop-filter: saturate(180%) blur(20px))": {
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            bgColor: "rgba(255, 255, 255, 0.92)",
          },
        }}
      >
        {/* Left section: Hamburger + Logo */}
        <HStack spacing={3}>
          <IconButton
            aria-label="Hamburger menu"
            display={{ base: "flex", md: "none" }}
            variant="ghost"
            onClick={onOpen}
            size="sm"
            icon={<Icon boxSize="1.25em" as={isOpen ? CloseIcon : MenuIcon} />}
          />
          <Logo size="md" />
        </HStack>

        <MobileNavbar isOpen={isOpen} onClose={onClose} />

        {/* Center section: Navigation with dropdowns */}
        <NavDropdown />

        {/* Right section: Search + Auth */}
        <HStack spacing={3} display={{ base: "none", md: "flex" }}>
          <SearchBar />
          <AuthButton />
        </HStack>

        {/* Mobile Auth */}
        <Box display={{ base: "block", md: "none" }}>
          <AuthButton />
        </Box>
      </Flex>
    </Box>
  )
}
