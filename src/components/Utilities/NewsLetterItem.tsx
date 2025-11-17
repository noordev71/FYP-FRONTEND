import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "../../assets/images/authPage.png";

interface NewsLetterItemProps {
  name: string;
  postDate: string;
  title: string;
  description: string;
  id: string;
}

const NewsLetterItem: React.FC<NewsLetterItemProps> = ({
  name,
  postDate,
  title,
  description,
  id,
}) => {
  const router = useRouter();
  return (
    <div
      className="w-full flex gap-x-4 py-4 items-center hover:cursor-pointer"
      onClick={() => {
        router.push(`public-blog/details/${id}`);
      }}
    >
      <Image src={Logo} alt="logo" className="w-[25%] h-fit rounded-md" />
      <div className="flex flex-col gap-y-3">
        <div className="flex text-gray-500 text-sm gap-x-2">
          <span>{name}</span>
          <span>-</span>
          <span>{postDate}</span>
        </div>
        <h2 className="text-lg">{title}</h2>
        <p className="text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default NewsLetterItem;
