"use client";
import React, { useState } from "react";
import { useChat } from 'ai/react';
import Image from 'next/image'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PulseLoader,BeatLoader } from "react-spinners";

interface ChatAvatarProps {
  ai?: boolean;
}

const ChatAvatar: React.FC<ChatAvatarProps> = (props) => {
  if (props.ai) {
    return <div className="p-2 w-8 h-8 text-xs justify-center items-center rounded font-bold bg-indigo-500 text-white aspect-square text-center flex flex-col">
      AI
    </div>
  }
  return <div className="p-2 w-8 h-8 text-xs justify-center items-center rounded font-bold bg-red-500 text-white aspect-square text-center flex flex-col">
    You
  </div>
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <>
      <div className="fixed inset-x-0 top-0 border-b border-white/20 backdrop-blur bg-white/10 z-30 ">
        <div className="mx-auto container px-4 md:px-0 flex py-3">
          <p className="font-bold">Genius-GPT</p>
        </div>
      </div>
      <div className='container mx-auto h-full max-w-2xl relative flex flex-col gap-2 pt-16 pb-24 px-4 md:px-0'>
        {messages.length > 0
          ? messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap flex items-start gap-2 py-2">
              <ChatAvatar ai={m.role !== "user"} />
              <ReactMarkdown remarkPlugins={[remarkGfm]} className="flex-1 overflow-clip bg-white/5 border-white/10 rounded p-3 border">
                {m.content}
              </ReactMarkdown>
            </div>
          ))
          : null}
      </div>
      <div className="container mx-auto max-w-2xl fixed bottom-0 inset-x-0 py-4 bg-black px-4 md:px-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="w-full p-2 border border-white/10 rounded bg-white/5 outline-none"
            type="text" value={input} onChange={handleInputChange} placeholder="Start conversation" />
          <button className="bg-green-500 p-2 rounded-md flex aspect-square items-center justify-center">{isLoading ? <PulseLoader color="white" size={6}/> : <PaperAirplaneIcon width={24} />}</button>
        </form>
      </div>
    </>
  )
}
