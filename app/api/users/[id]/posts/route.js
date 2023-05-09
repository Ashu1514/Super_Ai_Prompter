import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({ creator: params.id })
      .sort([["date", -1]])
      .populate("creator")
      .exec();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};
