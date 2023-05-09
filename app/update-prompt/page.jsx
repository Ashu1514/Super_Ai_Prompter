"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const UpdatePrompt = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
            prompt: data.prompt,
            tag: data.tag
        });
    }
    getPromptDetails();
  }, [promptId])

  const UpdatePromptHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if(!promptId) return alert("Propmt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if(response.ok){
        router.back();
      }
    } catch (error) {
        console.log(error);
    } finally {
        setSubmitting(false);
    }
  };
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePromptHandler}
    />
  );
};

export default UpdatePrompt;
