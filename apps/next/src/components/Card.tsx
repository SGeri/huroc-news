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
