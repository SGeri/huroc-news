import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import ProgressBar from "../../components/ProgressBar";
import Welcome6Image from "../../images/welcome6.png";
import useOnboarding, { type Document } from "../../lib/useOnboarding";

// We should reconsider the use of the image

export default function Documents() {
  const { progress, next, documents } = useOnboarding(5);

  const [acceptedDocuments, setAcceptedDocuments] = useState<Document[]>([]);

  const handleNext = () => {
    if (acceptedDocuments.length !== documents.length)
      return Toast.show({
        type: "error",
        text1: "Fontos dokumentumok",
        text2: "Kérjük, fogadd el az összes dokumentumot!",
      });

    next();
  };

  const toggleDocument = (document: Document) => {
    if (isDocumentAccepted(document)) {
      setAcceptedDocuments(acceptedDocuments.filter((d) => d !== document));
    } else {
      setAcceptedDocuments([...acceptedDocuments, document]);
    }
  };

  const isDocumentAccepted = (document: Document) => {
    return acceptedDocuments.includes(document);
  };

  return (
    <>
      <ProgressBar progress={progress} />

      <View className="h-full w-full flex-1 bg-[#121212]">
        <ScrollView>
          <View className="items-center justify-center p-8">
            <Text className="font-chairdrobe-rounded-bold mb-3 text-center text-3xl text-white">
              Fontos dokumentumok
            </Text>
            <Text className="font-noto-sans-regular mb-12 text-center text-base text-white">
              Az alkalmazás használatához el kell fogadnod a HRC News Használati
              Feltételeit, Szolgáltatási Feltételeinket és az Adatkezelési
              Tájékoztatónkban foglaltakat.
            </Text>

            {documents.map((document) => (
              <Document
                key={document.value}
                text={document.display}
                checked={isDocumentAccepted(document.value)}
                onPress={() => toggleDocument(document.value)}
              />
            ))}

            <View className="mb-12" />

            <Button width={100} height={40} onPress={handleNext}>
              Tovább
            </Button>

            <View className="mb-96" />
          </View>
        </ScrollView>
      </View>

      <Image
        className="absolute bottom-0 left-0 aspect-square h-[50%] min-h-[200] w-full"
        source={Welcome6Image}
      />
    </>
  );
}

type DocumentProps = {
  text: string;
  checked: boolean;
  onPress: () => void;
};

const Document = ({ text, checked, onPress }: DocumentProps) => (
  <>
    <Checkbox text={text} checked={checked} onPress={onPress} />

    <Separator />
  </>
);

const Separator = () => <View className="my-2 h-[2] w-full bg-white" />;
