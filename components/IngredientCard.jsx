"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const ingredients = post.prompt.split("\n").map((ingredient, index) => (
    <p key={index} className="my-1 font-satoshi text-sm text-gray-700">
      {ingredient}
    </p>
  ));

  return (
    <div className="prompt_card max-h-48 overflow-y-auto">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-[16px] font-bold text-gray-700 ">{post.title}</p>
      <p className="my-4 font-satoshi text-sm text-gray-700 ">
        <img src={post.recipe} alt={post.recipe} />
      </p>
      <p className="my-4 font-satoshi text-sm text-gray-700 ">{ingredients}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter font-bold text-sm text-blue-600 cursor-pointer"
            onClick={handleEdit}
          >
            Editar
          </p>
          <p
            className="font-inter font-bold text-sm text-red-700 cursor-pointer"
            onClick={handleDelete}
          >
            Deletar
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
