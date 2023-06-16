import {
  Button,
  Center,
  Checkbox,
  LoadingOverlay,
  Modal,
  MultiSelect,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

export type FormProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  loading: boolean;
  defaultValues?: FormValues;
};

export type FormValues = {
  title: string;
  category: (typeof categories)[number]["value"][];
  image: string;
  link: string;
  pinned: boolean;
};

const categories = [
  { value: "SERVICE_STATUS", label: "Service Status" },
  { value: "GTA_ONLINE", label: "GTA Online" },
  { value: "GTA_VI", label: "GTA VI" },
  { value: "GTA_TRIOLOGY", label: "GTA Triology" },
  { value: "RED_DEAD_ONLINE", label: "Red Dead Online" },
  { value: "ROCKSTAR_GAMES", label: "Rockstar Games" },
  { value: "TAKE_TWO", label: "Take Two" },
  { value: "HUROC", label: "Huroc" },
] as const;

const initialValues = {
  title: "",
  category: [],
  image: "",
  link: "",
  pinned: true,
} satisfies FormValues;

export default function Form({
  opened,
  onClose,
  onSubmit,
  defaultValues,
  loading,
}: FormProps) {
  const form = useForm({
    initialValues: defaultValues || initialValues,

    validate: {
      title: isNotEmpty("This field is required"),
      category: isNotEmpty("This field is required"),
      image: isNotEmpty("This field is required"),
      link: isNotEmpty("This field is required"),
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Add New Post" centered>
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          label="Title"
          placeholder="Title"
          required
          mb="sm"
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Image"
          placeholder="Image"
          required
          mb="sm"
          {...form.getInputProps("image")}
        />
        <TextInput
          label="Link"
          placeholder="Link"
          required
          mb="sm"
          {...form.getInputProps("link")}
        />
        <MultiSelect
          data={categories}
          label="Pick the appropriate categories"
          placeholder="Category"
          mb="sm"
          {...form.getInputProps("category")}
        />
        <Checkbox
          label="Pinned"
          // getInputProps only returns value prop, not checked
          checked={form.getInputProps("pinned").value as boolean}
          {...form.getInputProps("pinned")}
        />

        <Center>
          <Button type="submit">Post</Button>
        </Center>
      </form>
    </Modal>
  );
}
