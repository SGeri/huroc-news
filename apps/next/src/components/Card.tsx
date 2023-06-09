import Image from "next/image";
import dayjs from "dayjs";
import { FaPen, FaTrash } from "react-icons/fa";
import { type Category } from "@packages/db";
import { formatCategories } from "@packages/lib";

export type CardProps = {
  image: string;
  category: Category[];
  timestamp: Date;
  title: string;
  showActions?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

export default function Card({
  image,
  category,
  timestamp,
  title,
  showActions = true,
  onEditClick,
  onDeleteClick,
}: CardProps) {
  return (
    <div className="flex w-80 flex-col">
      <div className="mb-3 h-96 w-full rounded-md border border-white border-opacity-50 bg-black">
        <Image
          className="aspect-video w-full rounded-t-md"
          src={image}
          alt=""
          width={1067}
          height={600}
          priority
        />

        <div className="mt-2 flex flex-col justify-center p-2">
          <div className="flex flex-row text-lg">
            <p className="mr-2 text-white">
              {formatCategories(category).join(", ")}
              {" | "}
            </p>
            <p className="text-gray-400">
              {dayjs(timestamp).format("YYYY. MMMM DD.")}
            </p>
          </div>
          <p className="text-2xl text-white">{title}</p>
        </div>
      </div>

      {showActions && (
        <div className="flex flex-row items-center justify-center gap-4">
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white bg-black"
            onClick={onEditClick}
          >
            <FaPen />
          </div>
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white bg-black"
            onClick={onDeleteClick}
          >
            <FaTrash />
          </div>
        </div>
      )}
    </div>
  );
}

/*
function NewsCard(props) {
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      activeOpacity={0.8}
      onPress={() => {
        Linking.openURL(props.link);
      }}
    >
      <Image style={styles.cardImage} source={{ uri: props.thumbURL }} />
      <View style={styles.cardTextWrapper}>
        <View style={styles.cardTimestampWrapper}>
          <Text style={[styles.cardTimestamp, { color: "white" }]}>
            {props.category} |{" "}
          </Text>
          <Text style={[styles.cardTimestamp, { color: "grey" }]}>
            {props.timestamp}
          </Text>
        </View>
        <Text style={[styles.cardTitle]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loadingWrapper: {
    height: "100%",
    width: "100%",
    padding: "10%",
  },
  container: {
    padding: "8%",
  },
  cardWrapper: {
    height: 320,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#000000",
    marginBottom: "10%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  cardImage: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardTextWrapper: {
    height: "40%",
    padding: "5%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardTimestampWrapper: {
    flexDirection: "row",
  },
  cardTimestamp: {
    fontFamily: "NotoSansRegular",
    fontSize: 12,
  },
  cardTitle: {
    color: "white",
    fontFamily: "NotoSansBold",
    fontSize: 18,
  },
  pinnedPostWrapper: {
    width: "100%",
    height: 400,
    backgroundColor: "#000000",
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderBottomWidth: 1,
  },
  pinnedImage: {
    width: "100%",
    height: "60%",
  },
  loadMoreButton: {
    height: 40,
    width: 180,

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "#000000",

    padding: 5,
  },
  loadMoreButtonText: {
    color: "white",
    fontFamily: "ChairdrobeRoundedBold",
    textAlign: "center",
    fontSize: 22,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

*/
