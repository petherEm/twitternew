import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import React, { Dispatch, useState, useRef, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const { data: session } = useSession();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current?.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  };

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown user",
      profileImg:
        session?.user?.image ||
        "https://www.piotrmaciejewski.com/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fmecasual.1dae9088a694472b8409cf1551610cb6.png&w=1080&q=75",
      image: image,
    };
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);
    toast("Tweet posted", {
      icon: "🚀",
    });
    return json;
  };

  const handleSubmit = (
    e: { preventDefault: () => void; }
  ) => {
    e.preventDefault();

    postTweet();
    setInput("");
    setImage("");
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex flex-1 space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || "meFB.jpeg"}
        alt="profile_pic"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            ref={imageInputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What is happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex flex-1 justify-between items-center">
            <div className="flex space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
