import { useRef, useState } from "react";
import { type NextPage } from "next";
import { SignOutButton } from "@clerk/nextjs";
import {
  Button,
  Center,
  Container,
  Loader,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { type Post } from "@packages/db";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/auth";
import Card from "~/components/Card";
import Form, { type FormValues } from "~/components/Form";

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [take, setTake] = useState(5);
  const {
    data,
    isFetching: getPostsLoading,
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
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const createPost = api.posts.createPost.useMutation();
  const updatePost = api.posts.updatePost.useMutation();
  const removePost = api.posts.removePost.useMutation();

  const handleNewClick = () => {
    setPostToEdit(null);
    setOpened(true);
  };

  const handleNew = async (values: FormValues) => {
    await createPost.mutateAsync(values);

    setOpened(false);

    void refetch();
  };

  const handleEditClick = (id: string) => {
    setPostToEdit(posts?.find((post) => post.id === id) || null);
    setOpened(true);
  };

  const handleEditSend = async (values: FormValues) => {
    if (!postToEdit?.id) return;

    await updatePost.mutateAsync({
      id: postToEdit.id,
      post: values,
    });
  };

  const handleRemoveClick = (id: string) => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">Are you sure you want to remove this post? ({id})</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => void handleRemoveConfirmation(id),
    });
  };

  const handleRemoveConfirmation = async (id: string) => {
    await removePost.mutateAsync({ id });
  };

  const handleFormSubmit = async (values: FormValues) => {
    postToEdit ? await handleEditSend(values) : await handleNew(values);
    setOpened(false);
    void refetch();
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

      {opened && (
        <Form
          opened={opened}
          defaultValues={postToEdit || undefined}
          loading={createPost.isLoading || updatePost.isLoading}
          onClose={() => setOpened(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      <ScrollArea viewportRef={ref}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 xl:grid-cols-3 xl:gap-12">
          {(posts?.length ? posts : []).map((post, index) => (
            <div key={index} className="flex min-w-fit justify-center">
              <Card
                image={post.image}
                category={post.category}
                timestamp={post.createdAt}
                title={post.title}
                onEditClick={() => handleEditClick(post.id)}
                onDeleteClick={() => handleRemoveClick(post.id)}
              />
            </div>
          ))}
        </div>

        <Stack align="center" py="md" spacing="md" my="lg">
          {getPostsLoading && (
            <Center>
              <Loader />
            </Center>
          )}

          {!getPostsLoading && total !== posts?.length && (
            <Button
              className="w-36"
              onClick={() => setTake((prevTake) => prevTake + 3)}
              variant="outline"
            >
              MÉG MÉG MÉG
            </Button>
          )}
        </Stack>
      </ScrollArea>
    </Container>
  );
};

export const getServerSideProps = requireAuth();

export default Home;
