import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  try {
    const { searchParams } = req.nextUrl;
    const searchText = searchParams.get("search");
    await connectToDB();
    const searchQuery = {};
    if (searchText) {
      const regex = new RegExp(searchText, "i");
      const creators = await User.find(
        {
          $or: [
            { username: { $regex: regex } }, 
            { email: { $regex: regex } }],
        },
        { _id: 1 }
      );
      const creatorIds = creators.map((creator) => creator._id);
      searchQuery["$or"] = [
        { prompt: { $regex: regex } },
        { tag: { $regex: regex } },
      ];
      if (creatorIds.length) {
        searchQuery["$or"].push({ creator: { $in: creatorIds } });
      }
    }
    const aggregateQuery = [
      {
        $match: searchQuery,
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
      {
        $sort: { date: -1 },
      },
    ];

    const posts = await Prompt.aggregate(aggregateQuery).exec();

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};
