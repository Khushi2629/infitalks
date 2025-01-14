import User from "@models/User";
import { connectToDB } from "@mongodb";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const url = new URL(req.url, `http://${req.headers.host}`);
    const query = url.searchParams.get("query");

    let users;
    if (query) {
      users = await User.find({
        username: { $regex: query, $options: "i" } // Case-insensitive search
      });
    } else {
      users = await User.find();
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get users", { status: 500 });
  }
};
