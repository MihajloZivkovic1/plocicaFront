"use client";

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
export default function StoryModal({ story }: { story: { title: string, text: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div onClick={openModal} className="bg-gray-500 text-white rounded-md p-4 shadow-md w-full cursor-pointer">
        <h2 className="text-xl font-bold">{story.title}</h2>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-md max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {story?.text}
            </ReactMarkdown>
            <button onClick={closeModal} className="mt-4 p-2 bg-gray-800 text-white rounded-md">Close</button>
          </div>
        </div>
      )}
    </>
  );
}