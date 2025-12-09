import { SlSocialLinkedin } from "react-icons/sl";
import { FiFacebook } from "react-icons/fi";
import { PiArticle } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { PrimaryButton } from "./Button/PrimaryButton";
import Link from "next/link";
interface RecentSystemCardProps {
  platform: string;
  desc: string;
  title: string;
}
const RecentSystemCard: React.FC<RecentSystemCardProps> = ({
  title,
  platform,
  desc,
}) => {
  return (
    <div className="rounded-lg border border-primary p-6 shadow-sm flex flex-col justify-between gap-y-3  h-full">
      <div className="flex flex-row gap-x-1 items-center">
        {platform === "Facebook" ? (
          <FiFacebook className="size-6 text-primary" />
        ) : platform === "Linkedin" ? (
          <SlSocialLinkedin className="size-6 text-primary" />
        ) : platform === "Article" ? (
          <PiArticle className="size-6 text-primary" />
        ) : (
          <MdEmail className="size-6 text-primary" />
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm">{desc}</p>
      <div className=" w-fit mx-auto">
        <Link
          href={
            platform === "Facebook"
              ? "/facebook-add-posting"
              : platform === "Linkedin"
              ? "/linkedin-add-posting"
              : platform === "Email"
              ? "/email-marketing-add-posting"
              : platform === "Article"
              ? "/article-add-posting"
              : ""
          }
        >
          <PrimaryButton>Use System</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default RecentSystemCard;
