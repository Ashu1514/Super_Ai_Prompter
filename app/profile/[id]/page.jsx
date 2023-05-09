"use client";

import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const ProfilePage = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    const fetchProfile = async () => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();
      setProfile(data);
    };
    if (params?.id) {
      fetchProfile();
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name={profile?.username}
      desc={
        "Welcome to " +
        profile?.username +
        "'s personalized profile page. Explore " +
        profile?.username +
        " exceptional prompts and be inspired by the power of their imagination."
      }
      data={posts}
    />
  );
};

export default ProfilePage;
