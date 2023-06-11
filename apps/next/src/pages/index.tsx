import { useRef, useState } from "react";
import { NextPage } from "next";
import { SignOutButton } from "@clerk/nextjs";
import {
  Button,
  Center,
  Container,
  Loader,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/auth";
import Card from "~/components/Card";
import Form, { type FormValues } from "~/components/Form";

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [take, setTake] = useState(5);
  const {
    data,
    isLoading: getPostsLoading,
    refetch,
  } = api.posts.getPosts.useQuery(
    {
      take: take,
      skip: 0,
    },
    { keepPreviousData: true },
  );
  const { total, posts } = data || {};

  const [opened, setOpened] = useState(false);
  const { mutateAsync: createPost, isLoading: createPostLoading } =
    api.posts.createPost.useMutation();

  const handleScrollPositionChange = ({ x }: { x: number }) => {
    if (!ref.current) return;

    const scrollX = x + ref.current.clientWidth;
    const width = ref.current.scrollWidth;

    if (scrollX >= width && total != posts?.length) {
      // improve by adjusting ending offset
      setTake((prevTake) => prevTake + 3);
    }
  };

  const handleNewClick = () => {
    setOpened(true);
  };

  const handleNewPostCreate = async (values: FormValues) => {
    await createPost(values);

    setOpened(false);

    refetch();
  };

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
        <Button onClick={handleNewClick}>Add</Button>
        <SignOutButton>
          <Button>Logout</Button>
        </SignOutButton>
      </Center>

      {getPostsLoading && (
        <Center>
          <Loader />
        </Center>
      )}

      {opened && (
        <Form
          opened={opened}
          loading={createPostLoading}
          onClose={() => setOpened(false)}
          onSubmit={handleNewPostCreate}
        />
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
          {!getPostsLoading && total != posts?.length && (
            <Center>
              <Loader />
            </Center>
          )}
        </div>
      </ScrollArea>
    </Container>
  );
};

export const getServerSideProps = requireAuth();

export default Home;
