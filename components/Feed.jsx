"use client";

import { useState, useEffect, useCallback } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {Array.isArray(data) && data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt?search=");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    debounceSearch(searchText);
  }, [searchText]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);;
      }
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  }

  const debounceSearch = useCallback(debounce(async (value) => {
    const response = await fetch("/api/prompt?search=" + value);
    const data = await response.json();
    setPosts(data);
  }, 500), []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for Prompts, Tags, Usernames..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;