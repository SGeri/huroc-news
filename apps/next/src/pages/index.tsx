import { useRef, useState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import {
  Box,
  Button,
  Center,
  Container,
  Loader,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { Role } from "@packages/db";
import { api } from "~/utils/api";
import { ProtectedPage, requireAuth } from "~/utils/auth";
import { withParsedUser } from "~/utils/guard";
import Card from "~/components/Card";

const Home: ProtectedPage = ({ user }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const { data, isLoading } = api.posts.getPosts.useQuery(
    {
      take: take,
      skip: skip,
    },
    { keepPreviousData: true },
  );
  const { total, posts } = data || {};

  const handleScrollPositionChange = ({ x }: { x: number }) => {
    if (!ref.current) return;

    const scrollX = x + ref.current.clientWidth;
    const width = ref.current.scrollWidth;

    if (scrollX >= width && total != posts?.length) {
      // improve by adjusting ending offset
      setTake((prevTake) => prevTake + 1);
    }
  };

  console.log("posts", posts);

  return (
    <Container py="lg">
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
      <Center p="md">
        <SignOutButton>
          <Button>Logout</Button>
        </SignOutButton>
      </Center>

      {isLoading && (
        <Center>
          <Loader />
        </Center>
      )}

      <ScrollArea
        w={900}
        h={480}
        onScrollPositionChange={handleScrollPositionChange}
        viewportRef={ref}
      >
        <div className="flex flex-row gap-10">
          {(posts?.length ? posts : []).map((post, index) => (
            <Card
              key={index}
              image={post.image}
              category={post.category}
              timestamp={post.createdAt}
              title={post.title}
            />
          ))}
          {!isLoading && total != posts?.length && (
            <Center>
              <Loader />
            </Center>
          )}
        </div>
      </ScrollArea>
    </Container>
  );
};

export const getServerSideProps = requireAuth(Role.ADMIN);

export default withParsedUser(Home);
