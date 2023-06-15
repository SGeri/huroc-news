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
import { modals } from "@mantine/modals";
import { Post } from "@packages/db";
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
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const createPost = api.posts.createPost.useMutation();
  const updatePost = api.posts.updatePost.useMutation();
  const removePost = api.posts.removePost.useMutation();

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
    setPostToEdit(null);
    setOpened(true);
  };

  const handleNew = async (values: FormValues) => {
    await createPost.mutateAsync(values);

    setOpened(false);

    refetch();
  };

  const handleEditClick = async (id: string) => {
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

  const handleRemoveClick = async (id: string) => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">Are you sure you want to remove this post? ({id})</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => handleRemoveConfirmation(id),
    });
  };

  const handleRemoveConfirmation = async (id: string) => {
    await removePost.mutateAsync({ id });
  };

  const handleFormSubmit = async (values: FormValues) => {
    postToEdit ? await handleEditSend(values) : await handleNew(values);
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
          defaultValues={postToEdit || undefined}
          loading={createPost.isLoading || updatePost.isLoading}
          onClose={() => setOpened(false)}
          onSubmit={handleFormSubmit}
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
              onEditClick={() => handleEditClick(post.id)}
              onDeleteClick={() => handleRemoveClick(post.id)}
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
