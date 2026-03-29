import React, { useRef, useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useToast,
  VStack,
  Link as ChakraLink,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react"

import { HiOutlineMail, HiOutlineUser, HiX } from "react-icons/hi"
import { FiLink } from "react-icons/fi"
import { AiFillCheckCircle } from "react-icons/ai"
import { MdCopyright, MdSubject } from "react-icons/md"

import { footerLinks, CATEGORY_ID_ROUTE } from "src/constanst/routes"
import Logo from "./Logo"
import CustomToast from "../toast"
import config from "@/contents/site-settings.json"
import { useGlobalContext } from "src/context"

function FooterLink({ children, path }) {
  return (
    <Link
      href={path}
      fontSize={{ base: "sm", lg: "md" }}
      color="gray.400"
      _hover={{ color: "white" }}
    >
      {children}
    </Link>
  )
}

function FooterTitle({ children }) {
  const footerTitleSize = useBreakpointValue({ base: "md", md: "sm" })
  return (
    <Heading size={footerTitleSize} letterSpacing="sm" color="white">
      {children}
    </Heading>
  )
}

function FooterForm({
  form,
  setForm,
  handleSubmit,
  submitLoading,
  isLoggedIn,
}) {
  const placeholderFontSize = useBreakpointValue({ base: "sm", lg: "md" })
  const placeholderStyle = {
    color: "gray.500",
    fontSize: placeholderFontSize,
  }
  const inputStyle = {
    borderRadius: "md",
    borderColor: "gray.600",
    bg: "gray.800",
    color: "white",
    focusBorderColor: "brand.primary",
    _placeholder: { ...placeholderStyle },
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      align="flex-start"
      w={{ base: "full", md: "unset" }}
      name="contact-form"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
          _groupFocus={{
            color: "gray.700",
          }}
        >
          <HiOutlineMail />
        </InputLeftElement>
        <Input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={e =>
            setForm(values => ({ ...values, [e.target.name]: e.target.value }))
          }
          isReadOnly={isLoggedIn}
          {...inputStyle}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.400">
          <HiOutlineUser />
        </InputLeftElement>
        <Input
          placeholder="Your name (optional)"
          name="name"
          type="text"
          value={form.name}
          onChange={e =>
            setForm(values => ({ ...values, [e.target.name]: e.target.value }))
          }
          {...inputStyle}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.400">
          <MdSubject />
        </InputLeftElement>
        <Input
          placeholder="Subject (optional)"
          name="subject"
          type="text"
          value={form.subject}
          onChange={e =>
            setForm(values => ({ ...values, [e.target.name]: e.target.value }))
          }
          {...inputStyle}
        />
      </InputGroup>
      <Textarea
        placeholder="Message"
        name="message"
        resize="none"
        value={form.message}
        onChange={e =>
          setForm(values => ({ ...values, [e.target.name]: e.target.value }))
        }
        {...inputStyle}
      ></Textarea>
      <Button
        type="submit"
        bgColor="brand.primary"
        colorScheme="red"
        borderRadius="md"
        w="full"
        fontWeight="600"
        isLoading={submitLoading}
        _hover={{ bg: "#B91C1C" }}
      >
        Send
      </Button>
    </VStack>
  )
}

export default function Footer() {
  let footerRoutes = footerLinks.filter(r => r.path !== "/")
  const { categories } = useGlobalContext()
  const { data: session } = useSession()
  const [form, setForm] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const toast = useToast()
  const toastRef = useRef()
  const siteName = config.site_name || config.site_title
  // Extract domain (hostname) from configured base_url
  const extractDomain = url => {
    if (!url) return ""
    try {
      return new URL(url).hostname
    } catch (e) {
      return url.replace(/^https?:\/\//, "").split("/")[0]
    }
  }
  const domainToCheck = extractDomain(config.base_url)
  // Ensure deterministic categories for SSR hydration: use predefined categories
  // when global context has no categories yet (initial server/client render).
  const tagline = config.tagline || ""
  const displayCategories =
    categories && categories.length > 0
      ? categories
      : config.predefined_categories || []

  // Auto-fill email if user is logged in
  useEffect(() => {
    if (session?.user?.email) {
      setForm(prev => ({ ...prev, email: session.user.email }))
    }
  }, [session])

  // Build social links list only for non-empty values
  const socialLinks = []
  if (config.instagram_account && config.instagram_account.trim() !== "") {
    socialLinks.push({
      label: "Instagram",
      href: `/redirect?url=https://www.instagram.com/${config.instagram_account}`,
    })
  }
  if (config.twitter_account && config.twitter_account.trim() !== "") {
    const tw = config.twitter_account.trim()
    const twUrl = tw.startsWith("http")
      ? tw
      : `https://twitter.com/${tw.replace(/^@/, "")}`
    socialLinks.push({ label: "Twitter", href: `/redirect?url=${twUrl}` })
  }
  if (config.facebook_account && config.facebook_account.trim() !== "") {
    socialLinks.push({
      label: "Facebook",
      href: `/redirect?url=https://www.facebook.com/${config.facebook_account}`,
    })
  }
  if (
    (config.whatsapp && config.whatsapp.trim() !== "") ||
    (config.whatsapp_number && config.whatsapp_number.trim() !== "")
  ) {
    const waRaw = (config.whatsapp || config.whatsapp_number).trim()
    const waUrl = waRaw.startsWith("http")
      ? waRaw
      : `https://wa.me/${waRaw.replace(/[^+\d]/g, "").replace(/^\+/, "")}`
    socialLinks.push({ label: "WhatsApp", href: `/redirect?url=${waUrl}` })
  }
  if (config.github && config.github.trim() !== "") {
    const gh = config.github.trim()
    const ghUrl = gh.startsWith("http")
      ? gh
      : `https://github.com/${gh.replace(/^@/, "")}`
    socialLinks.push({
      label: "GitHub — Open source & free to use",
      href: `/redirect?url=${ghUrl}`,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          name: form.name || undefined,
          subject: form.subject || "Contact from website",
          message: form.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Clear form on success (keep email if logged in)
      setForm({
        email: session?.user?.email || "",
        name: "",
        subject: "",
        message: "",
      })

      toastRef.current = toast({
        duration: 6000,
        isClosable: true,
        render: () => (
          <CustomToast
            title="Success"
            body="Your message has been sent!"
            toast={toast}
            leftIcon={AiFillCheckCircle}
          />
        ),
      })
    } catch (error) {
      console.error("Contact form error:", error)
      toastRef.current = toast({
        duration: 6000,
        isClosable: true,
        render: () => (
          <CustomToast
            title="Error"
            body={error.message || "An error has occurred."}
            variant="error"
            toast={toast}
            leftIcon={HiX}
          />
        ),
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <Box
      w="100%"
      bgColor="gray.900"
      borderTopWidth="4px"
      borderTopColor="brand.primary"
      borderTopStyle="solid"
      pb={{ base: 0, xl: 10 }}
      pos="relative"
    >
      <Flex
        py={{ base: 8, md: 16 }}
        px={{ base: 6, md: 10, lg: 20 }}
        alignItems="flex-start"
        flexDirection={{ base: "column-reverse", md: "row" }}
        w={{ base: "full", md: "unset" }}
        pos="relative"
      >
        <VStack
          w={{ base: "full", md: "unset" }}
          align="flex-start"
          spacing={6}
          mt={{ base: 8, md: 0 }}
        >
          <Logo isLight />
          <Text fontSize="sm" color="gray.400" maxW="280px" lineHeight="1.6">
            {tagline}
          </Text>
          <HStack
            spacing={2}
            align="center"
            color="whiteAlpha.900"
            order={{ base: 1, md: 0 }}
            fontSize={{ base: "xs", lg: "sm" }}
            wordBreak="break-word"
          >
            <Icon aria-label="copyright icon" as={MdCopyright} color="white" />
            <Text
              color="white"
              fontWeight="600"
              fontSize={{ base: "xs", lg: "sm" }}
              ml={1}
            >
              {siteName} {new Date().getFullYear()}. All rights reserved.
            </Text>
          </HStack>
          <HStack color="gray.400" spacing={{ base: 2, md: 3 }} fontSize="sm">
            {socialLinks.map((s, idx) => (
              <React.Fragment key={s.href}>
                {idx > 0 && <Text color="gray.600">|</Text>}
                <ChakraLink
                  href={s.href}
                  aria-label={`${siteName} ${s.label}`}
                  isExternal
                  rel="noopener"
                  cursor="pointer"
                  fontWeight="500"
                  _hover={{ textDecoration: "underline", color: "white" }}
                >
                  {s.label}
                </ChakraLink>
              </React.Fragment>
            ))}
          </HStack>
        </VStack>

        <Stack
          spacing={{ base: 10, md: 8, lg: 20, xl: 40 }}
          direction={{ base: "column", md: "row" }}
          ml={{ base: 0, md: "auto" }}
          w={{ base: "full", md: "unset" }}
          pos="relative"
        >
          <VStack align={{ base: "flex-start" }} spacing={4}>
            <FooterTitle>SECTIONS</FooterTitle>
            {displayCategories.slice(0, 6).map(category => (
              <FooterLink
                key={category.slug}
                path={CATEGORY_ID_ROUTE(category.slug)}
              >
                {category.name}
              </FooterLink>
            ))}
          </VStack>

          <VStack align={{ base: "flex-start" }} spacing={4}>
            <FooterTitle>COMPANY</FooterTitle>
            <FooterLink path="/about-us">About Us</FooterLink>
            <FooterLink path="/authors">Our Authors</FooterLink>
            <FooterLink path="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink path="/terms-of-service">Terms of Service</FooterLink>
          </VStack>
          <VStack
            spacing={4}
            w={{ base: "full", md: "unset" }}
            align="flex-start"
          >
            <FooterTitle>GET IN TOUCH</FooterTitle>
            <FooterForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              submitLoading={submitLoading}
              isLoggedIn={!!session}
            />
          </VStack>
        </Stack>
      </Flex>
    </Box>
  )
}
