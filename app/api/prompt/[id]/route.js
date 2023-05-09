import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const post = await Prompt.findById(params.id);
    if (!post) {
      return new Response("Post not found!", { status: 404 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};

// PATCH

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { prompt, tag } = await req.json();
    const post = await Prompt.findById(params.id);
    if (!post) {
      return new Response("Post not found!", { status: 404 });
    }

    post.prompt = prompt;
    post.tag = tag;

    await post.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};

//DELETE

export const DELETE = async (req, { params }) => {
    try {
      await connectToDB();
      await Prompt.findByIdAndRemove(params.id);
  
      return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ message: error.message }, { status: 500 })
      );
    }
  };
