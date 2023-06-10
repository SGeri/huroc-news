import { useState } from "react";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { type ClerkAPIError } from "@clerk/types";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

type FormInput = typeof initialValues;

const SignInPage = () => {
  const router = useRouter();
  const { redirectUrl } = router.query;

  const { signIn, setSession, isLoaded } = useSignIn();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues,

    validate: {
      email: isEmail("Please enter a valid email"),
      password: isNotEmpty("Password is required"),
    },
  });

  const handleSubmit = async (input: FormInput) => {
    setLoading(true);

    try {
      if (!isLoaded) return;

      const { createdSessionId } = await signIn.create({
        identifier: input.email,
        password: input.password,
      });

      await setSession(createdSessionId);

      await router.replace(redirectUrl ? String(redirectUrl) : "/");
    } catch (err: unknown) {
      const clerkErr = err as {
        errors?: ClerkAPIError[];
      };

      console.error(
        "Error during login:",
        clerkErr?.errors && clerkErr?.errors?.length > 0
          ? clerkErr?.errors
          : err,
      );

      setError(clerkErr.errors?.[0]?.message || String(err));
    }

    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Huroc News
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Administration & Management
      </Text>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="test@huroc.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button
            fullWidth
            color="red"
            type="submit"
            mt="xl"
            disabled={loading}
            loading={loading}
          >
            Sign in
          </Button>

          <Text color="red" mt="md" align="center" size="sm">
            {error}
          </Text>
        </Paper>
      </form>
    </Container>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { userId } = getAuth(ctx.req);

  if (userId) return { redirect: { destination: "/", permanent: false } };

  return { props: {} };
};

export default SignInPage;
